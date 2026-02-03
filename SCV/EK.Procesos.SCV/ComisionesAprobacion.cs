using System;
using System.Collections.Generic;
using System.Threading.Tasks;


using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ComisionesAprobacion
        : p.Kontrol.BPBase<m.SCV.Interfaces.IComisionesAprobacion, d.SCV.Interfaces.IComisionesAprobacion>
        , p.SCV.Interfaces.IComisionesAprobacion, p.Kontrol.Interfaces.IWorkflowBP
    {
        public ComisionesAprobacion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IComisionesAprobacion dao)
            : base(factory, dao, "ComisionesAprobacion")
        {

        }

        public override async Task<m.SCV.Interfaces.IComisionesAprobacion> Save(m.SCV.Interfaces.IComisionesAprobacion item)
        {

            var comisionesPorAprobar = item.ComisionesPorAprobar;

            foreach (var element in comisionesPorAprobar)
            {
                if (element.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                {
                   
                    //decimal sumaImportes = element.ImportePorAplicar + element.ImporteAplicado;
                    //decimal restante = element.ImporteComision - sumaImportes; 

                   // element.ImporteAplicado = element.ImportePorAplicar;
                    element.Changed("ImporteAplicado", true);

                    //element.ImportePorAplicar = restante;
                    element.Changed("ImportePorAplicar", true);

                    //element.IdCompania = element.IdCompania;
                    element.Changed("IdCompania", true);

                    element.Changed("IdEstatus", true);
                    element.Changed("IdCentroCosto", true);

                    element.Modificado = DateTime.UtcNow;
                    element.IdModificadoPor = base.getUserId();

                    await this.dao.SaveEntity(element,false);
                }
             
            }
            return item;
        }

        public async Task<object> ObtenerRevisionVigente(Dictionary<string, object> parametros)
       {
            BeginTransaction(true);
            int idRevision = 0;

            object result = null;

            var daoRevision = Get<d.SCV.Interfaces.IComisionesRevision>();
            parametros = new Dictionary<string, object>();
            parametros.Add("validarVersionActiva",true);

            /*Validar si hay una revision en curso*/
            var revisionEnCurso = await daoRevision.GetAll(parametros);

            if (revisionEnCurso.Count>0)
            {
                idRevision = (int)revisionEnCurso[0].ID;
                /*Agregar nuevas comisiones generadas a version*/
                await this.dao.SaveRevisionDetalle(revisionEnCurso[0]);
            }
            else
            {
                /*Crear revision*/
                var version = await this.CrearRevision();
                var versionDetalle = await this.CrearRevisionDetalle((int)version.ID,null);
                idRevision = version.ID.Value;


                /*Generar Comisiones*/
               await this.dao.SaveRevisionDetalle(version);

            }
            result = await daoRevision.GetEstadiscoRevisionById(idRevision);

            Commit();
            return  result;
        }

        public async Task<List<m.SCV.Interfaces.IComisionesAprobacion>> ObtenerRevisionVigenteDetalle(Dictionary<string, object> parametros)
        {
            BeginTransaction(true);

            object idRevision = 0;
            parametros.TryGetValue("idRevision", out idRevision);

            int revisionID =Convert.ToInt32(idRevision);

            var result = await this.dao.GetRevisionDetalle(revisionID);
            Commit();
            return result;
        }

        private async Task<m.SCV.Interfaces.IComisionesRevision> CrearRevision()
        {
            var daoRevision = Get<d.SCV.Interfaces.IComisionesRevision>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            var estatus = await bpEstatus.Get("ESTATUSCOMISIONES", "PA");

            var revision = Get<m.SCV.Interfaces.IComisionesRevision>();

            int idUsuario = base.getUserId();
            DateTime dateTime = DateTime.UtcNow;

            revision.NRevision = 1;
            revision.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            revision.ID = -1;
            revision.IdEstatus = estatus.ID;
            revision.Creado = dateTime;
            revision.Modificado = dateTime;
            revision.IdCreadoPor = idUsuario;
            revision.IdModificadoPor = idUsuario;


            return await daoRevision.Save(revision);
        }

        private async Task<m.SCV.Interfaces.IComisionesRevisionDetalle> CrearRevisionDetalle(int idRevision, int? nRevision)
        {
            var daoRevisionDetalle = Get<d.SCV.Interfaces.IComisionesRevisionDetalle>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            var revisionDetalle = Get<m.SCV.Interfaces.IComisionesRevisionDetalle>();

            int numeroRevision = nRevision != null ? (int)nRevision : 1;

            var estatus = await bpEstatus.Get("ESTATUSCOMISIONES", "PA");

            int idUsuario = base.getUserId();
            DateTime dateTime = DateTime.UtcNow;


            revisionDetalle.NRevision = numeroRevision;
            revisionDetalle.IdRevision = idRevision;

            revisionDetalle.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            revisionDetalle.ID = -1;
            revisionDetalle.IdEstatus = estatus.ID;
            revisionDetalle.Creado = dateTime;
            revisionDetalle.Modificado = dateTime;
            revisionDetalle.IdCreadoPor = idUsuario;
            revisionDetalle.IdModificadoPor = idUsuario;

            return await daoRevisionDetalle.Save(revisionDetalle);
        }


        #region "WorkFlow"

        private string obtenerBPType(string clave)
        {
            string bpType = "";

            switch (clave)
            {
                case "comisionesAjustes":
                    bpType = "EK.Procesos.SCV.Interfaces.IComisionesAjustes, EK.Procesos.SCV";
                    break;
                case "comisionesAjustesDetalle":
                    bpType = "EK.Procesos.SCV.Interfaces.IComisionesAjustes, EK.Procesos.SCV";
                    break;
                case "comisionesTabuladores":
                    bpType = "EK.Procesos.SCV.Interfaces.IComisionesTabuladores, EK.Procesos.SCV";
                    break;
                case "comisionesSeguimiento":
                    bpType = "EK.Procesos.SCV.Interfaces.IComisionesSeguimiento, EK.Procesos.SCV";
                    break;
            }
            return bpType;
        }

        private async Task<m.Kontrol.Interfaces.IItemGeneral> obtenerEstatus(string clave)
        {
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUSCOMISIONES", clave);
            return estatus;
        }
        private async Task<m.SCV.Interfaces.IComisionesRevisionDetalle> actualizarRevisionDetalle(m.Kontrol.Interfaces.IItemGeneral estatus, int idRevision, int nRevision)
        {
            var daoComisionesRevisionDetalle = Get<d.SCV.Interfaces.IComisionesRevisionDetalle>();

            var revisionDetalle = await daoComisionesRevisionDetalle.GetRevisionDetalle(idRevision, nRevision);
            revisionDetalle.IdEstatus = estatus.ID.Value;

           return await daoComisionesRevisionDetalle.SaveEntity(revisionDetalle, false);
        }

        public override async Task<string> GetDescripcion(dynamic obj)
        {
            var daoRevision = Get<d.SCV.Interfaces.IComisionesRevision>();

            string id = obj["ID"].ToString();
            var revision = await daoRevision.GetEstadiscoRevisionById(Convert.ToInt32(id));
            var plantilla = await GetPlantilla("APRO-COMISIONES", revision, null);
            return plantilla.ToString();
        }

        public async Task<p.Kontrol.WorkflowResult> Authorize(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction(true);

                var daoComisionRevision = this.factory.GetInstance<d.SCV.Interfaces.IComisionesRevision>();
                var bpOrdenesCompra = this.factory.GetInstance<p.SCO.Interfaces.IOrdenesCompra>();


                /*Obtenemos Estatus de Aprobado para Comisiones Aprobado*/

                var estatusRevision = await this.obtenerEstatus("AP");

                var estatusComision = await this.obtenerEstatus("APLI");


                /*Obtenemos Elemento de Aprobacion Comisiones*/
                var comisionRevision = await daoComisionRevision.GetById(id);

                comisionRevision.IdEstatus = estatusRevision.ID;
                comisionRevision.IdModificadoPor = base.getUserId();

                /*Guardamos con estatus actualizado*/
                var result = await daoComisionRevision.Save(comisionRevision);

                /*actualiza rRevisionDetalle revision detalle*/
                await this.actualizarRevisionDetalle(estatusRevision, id, comisionRevision.NRevision);

                /*Obtenemos lista de comisones aprobadas*/

                var daoComisionesAprobadas = Get<m.SCV.Interfaces.IComisionesAprobacion>();
                var parametros = new Dictionary<string, object> { { "idRevision",id } };
                var listadoComisionesAprobadas = await this.ObtenerRevisionVigenteDetalle(parametros);

                try
                {
                    int contador = 0;
                    foreach (var item in listadoComisionesAprobadas)
                    {
                        contador++;
                        if (contador > 20)
                        {
                        }
                        var estatusAsignado = estatusComision;
                        


                        string bpType = this.obtenerBPType(item.TipoEntidad.Clave);
                        var bpInstance = (p.SCV.Interfaces.IComisionesAutorizacion)base.GetByTypeName(bpType);


                        /*Si el importe aplicado es 0 y la comision de aprueba pasar el valor*/
                        if (item.ImporteAplicado == 0 && (item.Estatus.Clave == "PA"))
                        {
                            item.ImporteAplicado = item.ImporteComision;
                            item.ImporteAplicadoRevision = item.ImporteComision;
                            item.ImportePorAplicar = 0;
                            await this.saveModel(item);
                        }
                        if (item.Estatus.Clave == "PA" &&(  item.IdCentroCosto ==null || item.IdCompania==null))
                        {
                            estatusAsignado =await this.obtenerEstatus("PEDN");
                            item.IdEstatus = estatusAsignado.ID.Value;
                            await this.saveModel(item);

                        }
                        if (item.Estatus.Clave == "PEND")
                        {
                            estatusAsignado = item.Estatus;
                        }
                        await bpInstance.ActualizarImportes(item, estatusAsignado);

                    }

                    await bpOrdenesCompra.GeneracionOrdenesCompra(id);

                }
                catch(Exception ex)
                {
                    Rollback();
                    throw new ApplicationException("Authorize::" + ex.Message, ex);
                }

                await LogEvent(id, "ComisionesAprobacion", 1053, "La revisión se ha autorizado");
                retValue.Success = true;
                retValue.Message = $"Se autorizo Comisiones Aprobacion";

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
                BeginTransaction(true);

                var daoComisionesRevision = Get<d.SCV.Interfaces.IComisionesRevision>();


                /*Obtener Valor Estatus Rechazo*/
                var estatus = await this.obtenerEstatus("REC");

                /*Obtener revision*/
                var comisionRevision = await daoComisionesRevision.GetById(id);

                int revisionInicial = comisionRevision.NRevision;

                /*Actualizar estatus y revision*/
                comisionRevision.IdEstatus = estatus.ID;
                comisionRevision.Modificado = DateTime.UtcNow;
                comisionRevision.IdModificadoPor = base.getUserId();
                comisionRevision.NRevision = comisionRevision.NRevision + 1;

                /*Guardar Cambios*/
                var result = await daoComisionesRevision.SaveEntity(comisionRevision, false);

                /*actualiza rRevisionDetalle revision detalle*/
                 await this.actualizarRevisionDetalle(estatus, id, revisionInicial);

                 /*Crear revision detalle*/
                 var revision2Detalle = await this.CrearRevisionDetalle(comisionRevision.ID.Value, revisionInicial+1);

                await LogEvent(id, "ComisionesAprobacion", 1053, "La revisión se ha rechazado");

                retValue.Success = true;
                retValue.Message = $"Se Rechazo la Aprobacion de Comisiones # {id}";
                Commit();

            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return retValue;
        }

        public async Task<object> RequestAuthorize(Dictionary<string,object> parametros)
        {

            var retValue = Get<m.SCV.Interfaces.IComisionesRevision>();
            object retResult = null;

            try
            {
                BeginTransaction(true);


                object idEntidad = 0;
                parametros.TryGetValue("id", out idEntidad);
                int idRevision = Convert.ToInt32(idEntidad);

                var daoComisionRevision = this.factory.GetInstance<d.SCV.Interfaces.IComisionesRevision>();

                /*Validar que todas las comisiones tengan un centro de costos y una compañia asignada*/
                var daoComisionAprobacion = this.factory.GetInstance<d.SCV.Interfaces.IComisionesAprobacion>();

                int resultado = await daoComisionAprobacion.ValidarAprobacionRevision(idRevision);

                if (resultado > 0)
                {
                    base.SetReturnInfo(1, "Indicar el centro de costo y compañia para cada comision o marcar como pendiente", 1);
                }
                else
                {
                    /*Obtenemos estatus por autorizar*/
                    var estatusComision = await this.obtenerEstatus("PAU");

                    /*Obtenemos revision por autorizar*/
                    retValue = await daoComisionRevision.GetById(idRevision);

                    retValue.IdModificadoPor = base.getUserId();
                    retValue.Modificado = DateTime.UtcNow;
                    retValue.IdEstatus = estatusComision.ID;
                    retValue = await daoComisionRevision.Save(retValue);

                    /*Obtenemos revision por autorizar detalle*/

                    await this.actualizarRevisionDetalle(estatusComision, idRevision, retValue.NRevision);

                    /*Iniciamos el Flujo de Autorizacion*/
                    await StartWorkflow("APRO-COMISIONES", retValue, base.getUserId());
                }

                

                /*Obtener estadistico de la version*/
                retResult = await daoComisionRevision.GetEstadiscoRevisionById(idRevision);

                Commit();

            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return retResult;
        }
        #endregion

    }
}
