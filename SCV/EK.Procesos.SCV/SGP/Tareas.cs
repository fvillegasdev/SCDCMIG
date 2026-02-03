using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;


namespace EK.Procesos.SGP
{
    public class Tareas
    :p.Kontrol.BPBase<m.SGP.Interfaces.ITareas, d.SGP.Interfaces.ITareas>,p.SGP.Interfaces.ITareas, p.Kontrol.Interfaces.IWorkflowBP
    {
        public Tareas(m.Kontrol.Interfaces.IContainerFactory factory,d.SGP.Interfaces.ITareas dao) : base(factory, dao, "sgp_tareas")
        {
        }

        public override async Task<m.SGP.Interfaces.ITareas> Save(m.SGP.Interfaces.ITareas item)
        {
            var elementoRecibido = item;

            var DependenciasAlInicio = item.DependenciasAlInicio;
            var DependenciasAlFin = item.DependenciasAlFin;

            var bpCatalogoGeneral = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpCatalogoGeneral.Get("ESTATUS", "A");
            var TipoDependenciasAlInicio= await bpCatalogoGeneral.Get("TIPODEPENDENCIATAREASGP", "DEPENDENCIASALINICIO");
            var TipoDependenciasAlFin = await bpCatalogoGeneral.Get("TIPODEPENDENCIATAREASGP", "DEPENDENCIASALFIN");

            var daoTareaDependencia = Get<d.SGP.Interfaces.ITareasDependencias>();

            try
            {
                BeginTransaction();
                if (item.ID > 0)
                {
                    var elementoAnterior = await dao.GetById((Int32)item.ID);
                    item.Changed("Clave", true);
                    item.Changed("FechaEstimadaInicio", true);
                    item.Changed("FechaEstimadaFin", true);
                    item.Changed("HoraEstimadaInicio", true);
                    item.Changed("HoraEstimadaFin", true);
                    item.Changed("Nombre", true);
                    item.Changed("IdEstatus", true);
                    item.Changed("PresentacionGantt", true);
                    item.Changed("Contemplaravance", true);
                    item.Changed("MaximoValor", true); 
                    item.Changed("TotalAvance", true);
                    item.Changed("IdPrioridad", true);
                    item.Changed("IdWorkFlow", true);
                    item.Changed("Descripcion", true);

                    item.Changed("IdFlujoAvance", true);
                    item.Changed("IdTipoAvance", true);
                    item.Changed("IdAsignadoA", true);

                    item.Modificado = DateTime.UtcNow;
                    item.Changed("Modificado", true);
                    item.IdModificadoPor = base.getUserId();
                    item.Changed("IdModificadoPor", true);

                    if (FinalizoTarea(item) && item.TotalAvance != elementoAnterior.TotalAvance){
                        await ActualizaEstatusFinalizada(item);
                    }

                    elementoRecibido = await this.dao.SaveEntity(item, true, false);

                    var TareasDependencia = Get<m.SGP.Interfaces.ITareasDependencias>();
                    TareasDependencia.IdEstatus = estatus.ID;
                    TareasDependencia.Creado = DateTime.UtcNow;
                    TareasDependencia.IdCreadoPor = base.getUserId();
                    TareasDependencia.Modificado = DateTime.UtcNow;
                    TareasDependencia.IdModificadoPor = base.getUserId();
                    TareasDependencia.IdTarea = item.ID;
                    if (DependenciasAlInicio != null && DependenciasAlInicio.Count > 0)
                    {
                        foreach (var depi in DependenciasAlInicio)
                        {
                            if (depi.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                TareasDependencia.IdTareaDependencia = depi.IdTareaDependencia;
                                TareasDependencia.IdTipoDependencia = (Int32)TipoDependenciasAlInicio.ID;
                                TareasDependencia.TipoDependencia = TipoDependenciasAlInicio;
                                TareasDependencia.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                                await daoTareaDependencia.SaveEntity(TareasDependencia, false, false);
                            }else if (depi.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoTareaDependencia.Delete((Int32)depi.ID);
                            }
                        }
                        
                    }
                    if (DependenciasAlFin != null && DependenciasAlFin.Count > 0)
                    {
                        foreach (var depf in DependenciasAlFin)
                        {
                            if (depf.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                TareasDependencia.IdTareaDependencia = depf.IdTareaDependencia;
                                TareasDependencia.IdTipoDependencia = (Int32)TipoDependenciasAlFin.ID;
                                TareasDependencia.TipoDependencia = TipoDependenciasAlFin;
                                TareasDependencia.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                                await daoTareaDependencia.SaveEntity(TareasDependencia, false, false);
                            }
                            else if (depf.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoTareaDependencia.Delete((Int32)depf.ID);
                            }
                        }

                    }

                    if (elementoAnterior.IdAsignadoA != elementoRecibido.IdAsignadoA) {
                        await SendNotification(elementoRecibido, elementoAnterior);
                    }

                    if(FinalizoTarea(item) && item.TotalAvance != elementoAnterior.TotalAvance){
                        if (item.WorkFlow.ID != null){
                            await StartWorkflow(item.WorkFlow.Clave, item, (int)item.IdModificadoPor);
                        }
                    }

                }
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("Error al guardar la tarea.", ex);
            }
            return elementoRecibido;
        }

        public async Task<List<m.SGP.Interfaces.ITareasDependencias>> GetTareasDependencias(Dictionary<string,object> parametros)
        {
            var daoTD = Get<d.SGP.Interfaces.ITareasDependencias>();
            return await daoTD.GetAll(parametros);
        }

        public async Task<m.SGP.Interfaces.IWBS[]> ActualizarSeguimiento(m.SGP.Interfaces.ITareas item)
        {
            var elementoRecibido = item;
            var bpIWBS = Get<p.SGP.Interfaces.IWBS>();
            item = await this.GetById((Int32)elementoRecibido.ID);
            var elementoAnterior = await this.GetById((Int32)elementoRecibido.ID); ;

            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var porAutorizar = await bpEstatus.Get("FLUJOAVANCETAREASGP", "PORAUTORIZAR");
            var finalizada = await bpEstatus.Get("FLUJOAVANCETAREASGP", "FINALIZADA");

            try
            {
                BeginTransaction();
                if (elementoRecibido.ID > 0)
                {
                    item.TotalAvance = elementoRecibido.TotalAvance;
                    item.Changed("TotalAvance", true);
                    item.Modificado = DateTime.UtcNow;
                    item.Changed("Modificado", true);
                    item.IdModificadoPor = base.getUserId();
                    item.Changed("IdModificadoPor", true);

                    if (FinalizoTarea(item)){
                        await ActualizaEstatusFinalizada(item);
                    }

                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    elementoRecibido = await this.dao.SaveEntity(item, true, false);
                    if (FinalizoTarea(item)){
                        if (item.WorkFlow.ID != null){
                            await StartWorkflow(item.WorkFlow.Clave, item, (int)item.IdModificadoPor);
                        }
                        
                        await SendNotification(elementoRecibido, elementoAnterior);
                    }
                }
                Commit();

                var parameters = new Dictionary<string, object> {{ "Idtarea", elementoRecibido.ID }};
                return await bpIWBS.GetTreeConfiguration(parameters);
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("Error al actualizar el seguimiento de la tarea.", ex);
            }
            //return elementoRecibido;
        }
        public async Task<m.SGP.Interfaces.IWBS[]> IniciarTarea(m.SGP.Interfaces.ITareas item)
        {
            var elementoRecibido = item;
            var bpIWBS = Get<p.SGP.Interfaces.IWBS>();
            item = await this.GetById((Int32)elementoRecibido.ID);
            //var elementoAnterior = await this.GetById((Int32)elementoRecibido.ID); ;

            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatusAsignar = await bpEstatus.Get("FLUJOAVANCETAREASGP", elementoRecibido.FlujoAvance.Clave);

            try
            {
                BeginTransaction();
                if (elementoRecibido.ID > 0)
                {
                    if (elementoRecibido.FlujoAvance.Clave== "ENPROCESO" && item.FlujoAvance.Clave == "NOINICIADA")
                    {
                        item.FechaRealInicio= DateTime.UtcNow;
                        item.Changed("FechaRealInicio", true);
                        item.HoraRealInicio = DateTime.UtcNow;
                        item.Changed("HoraRealInicio", true);
                    }

                    item.IdFlujoAvance = (Int32)estatusAsignar.ID;
                    item.Changed("IdFlujoAvance", true);
                    item.Modificado = DateTime.UtcNow;
                    item.Changed("Modificado", true);
                    item.IdModificadoPor = base.getUserId();
                    item.Changed("IdModificadoPor", true);


                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    elementoRecibido = await this.dao.SaveEntity(item, true, false);
                }
                Commit();

                var parameters = new Dictionary<string, object> {{ "Idtarea", elementoRecibido.ID }};
                return await bpIWBS.GetTreeConfiguration(parameters);
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("Error al actualizar el seguimiento de la tarea.", ex);
            }
        }

        private async Task SendNotification(m.SGP.Interfaces.ITareas item, m.SGP.Interfaces.ITareas elementoAnterior)
        {
            var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
            var bpUsuario = Get<p.Kontrol.Interfaces.IUsuario>();
            var optionAut = await bpOption.GetByClave("sgp_tareas");
            var bpProyectos = Get<p.SGP.Interfaces.IProyectos>();
            var bpWBS = Get<p.SGP.Interfaces.IWBS>();

            var pm = await GetGlobalParameters("INSTALACION");
            string optionPath = optionAut.Ruta;
            string linkTarea;


            if (optionPath.Contains(":id"))
            {
                linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}".Replace(":id", "");
            }
            else
            {
                if (!optionPath.EndsWith("/"))
                {
                    linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}/";
                }
                else
                {
                    linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}";
                }
            }

            var parametros = new Dictionary<string, object>()
            {
                { "Link", linkTarea + item.ID.Value.ToString() }
            };

            if (FinalizoTarea(item) && item.TotalAvance != elementoAnterior.TotalAvance)
            {
                var wbs = await bpWBS.GetById(item.IdWBS);
                var proyecto = await bpProyectos.GetById(wbs.IdProyecto);
                if (proyecto != null && proyecto.IdResponsable > 0 && proyecto.IdAsignadoA > 0)
                {
                    if (proyecto.IdResponsable != proyecto.IdAsignadoA)
                    {
                        await SendNotification(await bpUsuario.GetById((Int32)proyecto.IdAsignadoA), "SGP-TAREA", linkTarea, item, parametros);
                        await SendNotification(await bpUsuario.GetById((Int32)proyecto.IdResponsable), "SGP-TAREA", linkTarea, item, parametros);
                    }
                    else
                    {
                        await SendNotification(await bpUsuario.GetById((Int32)proyecto.IdAsignadoA), "SGP-TAREA", linkTarea, item, parametros);
                    }
                }
            }
            if (elementoAnterior.IdAsignadoA != item.IdAsignadoA)
            {
                await SendNotification(await bpUsuario.GetById((Int32)item.IdAsignadoA), "SGP-TAREA", linkTarea, item, parametros);
            }
        }

        private async Task ActualizaEstatusFinalizada(m.SGP.Interfaces.ITareas item)
        {
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var porAutorizar = await bpEstatus.Get("FLUJOAVANCETAREASGP", "PORAUTORIZAR");
            var finalizada = await bpEstatus.Get("FLUJOAVANCETAREASGP", "FINALIZADA");

            if (item.WorkFlow.ID != null)
            {
                item.IdFlujoAvance = (int)porAutorizar.ID;
                item.Changed("TotalAvance", false);
            }
            else
            {
                item.IdFlujoAvance = (int)finalizada.ID;
            }
            item.Changed("IdFlujoAvance", true);

            item.FechaRealFin = DateTime.UtcNow;
            item.Changed("FechaRealFin", true);
            item.HoraRealFin = DateTime.UtcNow;
            item.Changed("HoraRealFin", true);
        }

            private bool FinalizoTarea(m.SGP.Interfaces.ITareas item)
        {
            if (item.MaximoValor == null)
            {
                if (item.TotalAvance== 100)
                {
                    return true;
                }
            }
            else if(item.TotalAvance == item.MaximoValor)
            {
                return true;
            }
            return false;
        }

        #region "Workflow"
        public override async Task<string> GetDescripcion(dynamic obj)
        {
            //var idExpediente = Convert.ToInt32(obj.ID);
            //var tarea = await this.GetByExpedienteId(idExpediente);

            ////// AUT-VENTA
            //var plantilla = await GetPlantilla("AUT-VENTA", tarea, null);
            //return plantilla.ToString();
            return "";
        }

        public async Task<p.Kontrol.WorkflowResult> Authorize(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                retValue.Success = true;
                retValue.Message = $"Se autorizó la tarea #{id}";

                var item = await this.GetById(id);
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var finalizada = await bpEstatus.Get("FLUJOAVANCETAREASGP", "FINALIZADA");

                if (instance.Workflow.Clave == "SGP-TAR-VERIFICACION")
                {
                    item.IdFlujoAvance = (int)finalizada.ID;
                    item.Changed("IdFlujoAvance", true);
                    item.Modificado = DateTime.UtcNow;
                    item.Changed("Modificado", true);
                    item.IdModificadoPor = base.getUserId();
                    item.Changed("IdModificadoPor", true);

                    if (item.MaximoValor == null){
                        item.TotalAvance = 100;
                    }else{
                        item.TotalAvance = item.MaximoValor;
                    }

                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item = await this.dao.SaveEntity(item, true, false);
                }
                else if (instance.Workflow.Clave == "SGP-TAR-VALIDACION")
                {
                    item.IdFlujoAvance = (int)finalizada.ID;
                    //item.Changed("IdFlujoAvance", true);
                    item.Modificado = DateTime.UtcNow;
                    //item.Changed("Modificado", true);
                    item.IdModificadoPor = base.getUserId();
                    //item.Changed("IdModificadoPor", true);

                    if (item.MaximoValor == null){
                        item.TotalAvance = 100;
                    }else{
                        item.TotalAvance = item.MaximoValor;
                    }

                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item = await this.dao.SaveEntity(item, true, false);
                }
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<p.Kontrol.WorkflowResult> Reject(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                retValue.Success = true;
                retValue.Message = $"Se autorizó la tarea #{id}";

                var item = await this.GetById(id);

                if (instance.Workflow.Clave == "SGP-TAR-VERIFICACION")
                {
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var finalizada = await bpEstatus.Get("FLUJOAVANCETAREASGP", "FINALIZADA");

                    item.IdFlujoAvance = (int)finalizada.ID;
                    item.Changed("IdFlujoAvance", true);
                    item.Modificado = DateTime.UtcNow;
                    item.Changed("Modificado", true);
                    item.IdModificadoPor = base.getUserId();
                    item.Changed("IdModificadoPor", true);

                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item = await this.dao.SaveEntity(item, true, false);
                }
                else if (instance.Workflow.Clave == "SGP-TAR-VALIDACION")
                {
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var finalizada = await bpEstatus.Get("FLUJOAVANCETAREASGP", "FINALIZADA");

                    item.IdFlujoAvance = (int)finalizada.ID;
                    item.Changed("IdFlujoAvance", true);
                    item.Modificado = DateTime.UtcNow;
                    item.Changed("Modificado", true);
                    item.IdModificadoPor = base.getUserId();
                    item.Changed("IdModificadoPor", true);

                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item = await this.dao.SaveEntity(item, true, false);
                }
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        #endregion
    }
}