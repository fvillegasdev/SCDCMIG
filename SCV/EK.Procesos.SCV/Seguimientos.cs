using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

using EK.Drivers.Log;

namespace EK.Procesos.SCV
{
    public class RetornoValoresEtapa
    {
        public RetornoValoresEtapa()
        {
            this.Id = 0;
            this.Nombre = "";
            this.codigo = 0;
            this.etapaFinal = "";
        }
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int codigo { get; set; }
        public string etapaFinal { get; set; }
    }

    public class Seguimientos
        : p.Kontrol.ProcesoBase,
        p.SCV.Interfaces.ISeguimientos,
        p.Kontrol.Interfaces.IWorkflowBP
    {
        private readonly string RESPONSABLE_SISTEMA = "Sistema";
        //private readonly string RESPONSABLE_USUARIO = "Usuario";
        private readonly string EVENTO_INICIAR_ETAPA = "Iniciar-Etapa";
        //private readonly string EVENTO_DURANTE_ETAPA = "Durante-Etapa";
        private readonly string EVENTO_FINALIZAR_ETAPA = "Finalizar-Etapa";

        private d.SCV.Interfaces.ISeguimientos dao;

        public Seguimientos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISeguimientos dao)
            : base(factory, dao, "seguimientos")
        {
            this.factory = factory;
            this.dao = dao;
        }

        #region EXPEDIENTE
        public virtual async Task<object> SetIniciaExpediente(m.SCV.Interfaces.ISeguimiento item)
        {
            var retornoValores = new RetornoValoresEtapa();

            await dao.setIniciaExpediente(item, "INICIA_EXPEDIENTE", base.getUserId());
            try
            {
                return retornoValores;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        #endregion

        #region SEGUIMIENTO
        public async Task<List<m.SCV.Interfaces.ISeguimiento>> GetAllByParams(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAll(parametros);
        }

        public async Task<object[]> GetAll(int activos)
        {
            return await this.dao.GetAll(activos);
        }

        public async Task<m.SCV.Interfaces.ISeguimiento> GetById(int id)
        {
            return await this.dao.GetById(id);
        }

        public async Task<m.SCV.Interfaces.ISeguimiento> GetSeguimientoActivo(int idExpediente)
        {
            var retValue = Get<m.SCV.Interfaces.ISeguimiento>();

            var parametros = new Dictionary<string, object>() {
                { "idExpediente", idExpediente },
                { "operacion", "SEGUIMIENTO_ACTIVO_EXPEDIENTE" }
            };

            var seguimientos = await this.GetAllByParams(parametros);
            if (seguimientos != null && seguimientos.Count > 0)
            {
                retValue = seguimientos.FirstOrDefault();
            }

            return retValue;
        }

        public async Task<m.Kontrol.Interfaces.IPosicion> GetAgenteSeguimientoActivo(int idExpediente)
        {
            var bpPosiciones = Get<EK.Procesos.Kontrol.Interfaces.IPosicion>();

            var seguimientoActivo = await this.GetSeguimientoActivo(idExpediente);
            return await bpPosiciones.GetById(seguimientoActivo.IdPosicion.Value);

        }

        public async Task<m.SCV.Interfaces.ISeguimiento> GetSeguimientoByFase(int idExpediente, string faseClave)
        {
            var retValue = Get<m.SCV.Interfaces.ISeguimiento>();

            //{consultar la fase del seguimiento solicitado}
            var bpFaseExpediente = Get<EK.Procesos.SCV.Interfaces.IFasesExpediente>();
            var faseExpediente = await bpFaseExpediente.GetByClave(faseClave);
            int idFaseExpediente = faseExpediente.ID ?? 0;

            var parametros = new Dictionary<string, object>() {
                { "idExpediente", idExpediente },
                { "idFaseExpediente", idFaseExpediente }
            };

            //{obtener información del seguimiento solicitado}
            var seguimientos = await this.GetAllByParams(parametros);
            if (seguimientos.Count > 0)
            {
                retValue = seguimientos.FirstOrDefault();
            }

            //{asignar siempre el id expediente al seguimiento solicitado}
            retValue.IdExpediente = idExpediente;
            retValue.IdFase = idFaseExpediente;
            retValue.Fase = faseExpediente;

            //{consultar estatus seguimiento finalizado}
            var bpEstatusFinalizado = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatusFinalizado = await bpEstatusFinalizado.Get("SCVESTATUSSEGUIMIENTO", "F");
            int idEstatusFinalizado = estatusFinalizado.ID.Value;

            string fasePrevia = "";

            if (faseClave == "FASE-VENT")
            {
                fasePrevia = "FASE-PROS";
            }

            if (faseClave == "FASE-POST")
            {
                fasePrevia = "FASE-VENT";
            }

            //{consultar fase expediente del seguimiento anterior del solicitado}
            var bpFaseAnterior = Get<EK.Procesos.SCV.Interfaces.IFasesExpediente>();
            var faseAnterior = await bpFaseAnterior.GetByClave(fasePrevia);
            int idFaseAnterior = faseAnterior != null ? faseAnterior.ID.Value : 0;

            parametros.Clear();
            parametros.Add("idExpediente", idExpediente);
            parametros.Add("idFaseExpediente", idFaseAnterior);

            //{consultar seguimiento de expediente anterior del solicitado}
            var items = await this.GetAllByParams(parametros);
            var anterior = items.FirstOrDefault();

            //{para activar una fase debe existir una previa, excepto para la primera}
            retValue.AllowEdicion = true;

            //{si no existe una fase anterior entonces es la primera fase del expediente}
            if (anterior == null && faseExpediente.Orden > 1)
            {
                retValue.AllowEdicion = false;
            }

            //{si la fase anterior está activa entonces no se debe habilitar la fase requerida}
            if (anterior != null && anterior.IdEstatusSeguimiento != idEstatusFinalizado)
            {
                retValue.AllowEdicion = false;
            }

            //{si la fase requerida está finaliza, ya no se puede habilitar}
            if (retValue.IdEstatusSeguimiento == idEstatusFinalizado)
            {
                retValue.AllowEdicion = false;
            }

            //{obtener lista de autorizados del seguimiento}
            parametros.Clear();
            parametros.Add("idSeguimiento", retValue.ID ?? 0);

            var daoSA = Get<d.SCV.Interfaces.ISeguimientosAutorizados>();
            var autorizados = await daoSA.GetAll(parametros);

            retValue.Autorizados = autorizados;

            return retValue;
        }

        public async Task<m.SCV.Interfaces.ISeguimiento> Create(int idExpediente, int idFaseExpediente, int idEsquema, int idPosicion, int idEntidadFase, DateTime? fechaEstimada, string claveEstatusSeguimiento)
        {
            BeginTransaction(true);
            var item = Get<m.SCV.Interfaces.ISeguimiento>();
            try
            {
                //{consultar estatus seguimiento}
                var bpEstatusSeguimiento = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", claveEstatusSeguimiento);
                int idEstatusSeguimiento = estatusSeguimiento.ID.Value;

                //{consultar estatus bitacora}
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");
                int idEstatus = estatus.ID.Value;

                //**Consulta Seguimiento, **//
                var retValue = Get<m.SCV.Interfaces.ISeguimiento>();
                var parametros = new Dictionary<string, object>(){
                    { "idExpediente", idExpediente },
                    { "idFaseExpediente", idFaseExpediente }
                };

                //{obtener información del seguimiento solicitado}
                var seguimientos = await this.GetAllByParams(parametros);
                var p = new Dictionary<string, object>();
                int idSeguimiento = 0;
                if (seguimientos.Count > 0)
                {
                    retValue = seguimientos.FirstOrDefault();
                    p.Add("Id", retValue.ID.Value);
                    p.Add("IdEstatusSeguimiento", idEstatusSeguimiento);
                    p.Add("IdEstatus", idEstatus);
                    p.Add("ModificadoPor", base.getUserId());
                    p.Add("OperacionEspecificaSP", "ACTUALIZAR_MOTIVO_SUSPENSION");

                    //{actualizar el seguimiento}
                    idSeguimiento = await this.dao.Save(p);
                }
                //Hasta AQUI//

                if (idSeguimiento == 0)
                {
                    #region SEGUIMIENTO_INSERT

                    p = new Dictionary<string, object>(){
                        { "IdExpediente", idExpediente },
                        { "IdFaseExpediente", idFaseExpediente },
                        { "IdEntidadFase", idEntidadFase },
                        { "IdEsquema", idEsquema },
                        { "FechaEstimada", fechaEstimada },
                        { "IdPosicion", idPosicion },
                        { "IdEstatusSeguimiento", idEstatusSeguimiento },
                        { "IdEstatus", idEstatus },
                        { "CreadoPor", base.getUserId() },
                        { "ModificadoPor", base.getUserId() },
                        { "OperacionEspecificaSP", "ABC"}
                    };

                    idSeguimiento = await this.dao.Save(p);
                }
                #endregion
                //Validar que solo inserte cuando la fase es activa. pendiente.
                if (claveEstatusSeguimiento == "A")
                {
                    #region ETAPAS_INSERT

                    p = new Dictionary<string, object>()
                {
                    { "IdSeguimiento", idSeguimiento },
                    { "IdEsquema", idEsquema },
                    { "CreadoPor", base.getUserId() },
                    { "ModificadoPor", base.getUserId() },
                    { "OperacionEspecificaSP", "ABC" }
                };

                    await this.dao.SaveEtapa(p);

                    #endregion

                    #region REQUISITOS_INSERT

                    p = new Dictionary<string, object>()
                {
                    { "IdExpediente", idExpediente },
                    { "IdSeguimiento", idSeguimiento },
                    { "IdEsquema", idEsquema },
                    { "IdEstatus", idEstatus },
                    { "CreadoPor", base.getUserId() },
                    { "ModificadoPor", base.getUserId() },
                    { "OperacionEspecificaSP", "ABC" }
                };

                    await this.dao.SaveRequisito(p);

                    #endregion

                    #region DOCUMENTOS_INSERT

                    p = new Dictionary<string, object>()
                {
                    { "IdSeguimiento", idSeguimiento },
                    { "IdEsquema", idEsquema },
                    { "IdEstatus", idEstatus },
                    { "IdCreadoPor", base.getUserId() },
                    { "IdModificadoPor", base.getUserId()}
                };

                    await this.dao.SaveDocumento(p);

                    #endregion

                    #region PROCESOS_INSERT

                    p = new Dictionary<string, object>()
                {
                    { "IdSeguimiento", idSeguimiento },
                    { "IdEsquema", idEsquema },
                    { "IdCreadoPor", base.getUserId() },
                    { "IdModificadoPor", base.getUserId() },
                    { "OperacionEspecificaSP", "ABC" }
                };

                    await this.dao.SaveProceso(p);

                    #endregion

                    #region EJECUCION_PROCESOS_INICIALES

                    await this.EjecutarProcesos(idSeguimiento, 1, RESPONSABLE_SISTEMA, EVENTO_INICIAR_ETAPA);

                    #endregion
                }
                item = await this.dao.GetByEntidadId(idSeguimiento);

                Commit();

                await Log(item);
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return item;
        }

        public async Task<m.SCV.Interfaces.ISeguimiento> Save(m.SCV.Interfaces.ISeguimiento item)
        {
            var retValue = this.factory.GetInstance<m.SCV.Interfaces.ISeguimiento>();
            try
            {
                BeginTransaction(true);

                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", item.ID);
                parameters.Add("IdExpediente", item.IdExpediente);
                parameters.Add("IdFaseExpediente", item.IdFase);
                parameters.Add("IdEntidadFase", item.IdEntidadFase);
                parameters.Add("IdEsquema", item.IdEsquema);
                parameters.Add("IdPosicion", item.IdPosicion);
                parameters.Add("VigenciaEstatus", item.VigenciaEstatus);
                parameters.Add("IdMotivoSuspension", item.IdMotivoSuspension);
                parameters.Add("IdMotivoReanudacion", item.IdMotivoReanudacion);
                parameters.Add("IdMotivoCancelacion", item.IdMotivoCancelacion);
                parameters.Add("Justificacion", item.Justificacion);
                parameters.Add("IdEstatusSeguimiento", item.IdEstatusSeguimiento);
                parameters.Add("FechaEstimada", item.FechaEstimada);
                parameters.Add("IdEstatus", item.IdEstatus);
                parameters.Add("CreadoPor", base.getUserId());
                parameters.Add("ModificadoPor", base.getUserId());
                parameters.Add("OperacionEspecificaSP", "ABC");

                int id = await this.dao.Save(parameters);

                retValue = await this.dao.GetByEntidadId(id);

                await Log(retValue);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        //S: Suspension del seguimiento
        //A: Activar seguimiento
        //C: Cancelar seguimiento
        public async Task<m.SCV.Interfaces.ISeguimiento> SaveSuspension(m.SCV.Interfaces.ISeguimiento item, string claveEstatus)
        {
            var retValue = Get<m.SCV.Interfaces.ISeguimiento>();

            try
            {
                BeginTransaction();

                retValue = await this.UpdateSeguimiento(item, claveEstatus);
                if (retValue == null)
                {
                    Rollback();
                    return null;
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

        public async Task Log(m.SCV.Interfaces.ISeguimiento item)
        {
            if (item == null) return;

            dynamic entity = new ElasticEntity();

            entity.ID = item.ID;
            entity.Nombre = item.Nombre;
            entity.IdEntidadFase = item.IdEntidadFase;
            entity.Justificacion = item.Justificacion;
            entity.VigenciaEstatus = item.VigenciaEstatus;

            if (item.Fase != null)
            {
                entity.IdFaseExpediente = item.IdFase;
                entity.IdFaseExpedienteClave = item.Fase.Clave;
                entity.IdFaseExpedienteNombre = item.Fase.Nombre;
            }

            if (item.Expediente != null)
            {
                entity.IdExpediente = item.IdExpediente;
                entity.IdExpedienteClave = item.Expediente.Clave;
                entity.IdExpedienteNombre = item.Expediente.Nombre;
            }

            if (item.Venta != null)
            {
                entity.IdVenta = item.IdVenta;
                entity.IdVentaClave = item.Venta.Clave;
                entity.IdVentaNombre = item.Venta.Nombre;
            }

            if (item.Esquema != null)
            {
                entity.IdEsquema = item.IdEsquema;
                entity.IdEsquemaClave = item.Esquema.Clave;
                entity.IdEsquemaNombre = item.Esquema.Nombre;
            }

            if (item.EstatusSeguimiento != null)
            {
                entity.IdEstatusSeguimiento = item.IdEstatusSeguimiento;
                entity.IdEstatusSeguimientoClave = item.EstatusSeguimiento.Clave;
                entity.IdEstatusSeguimientoNombre = item.EstatusSeguimiento.Nombre;
            }

            if (item.MotivoSuspension != null)
            {
                entity.IdMotivoSuspension = item.IdMotivoSuspension;
                entity.IdMotivoSuspensionClave = item.MotivoSuspension.Clave;
                entity.IdMotivoSuspensionNombre = item.MotivoSuspension.Nombre;
            }

            if (item.MotivoCancelacion != null)
            {
                entity.IdMotivoCancelacion = item.IdMotivoCancelacion;
                entity.IdMotivoCancelacionClave = item.MotivoCancelacion.Clave;
                entity.IdMotivoCancelacionNombre = item.MotivoCancelacion.Nombre;
            }

            if (item.MotivoReanudacion != null)
            {
                entity.IdMotivoReanudacion = item.IdMotivoReanudacion;
                entity.IdMotivoReanudacionClave = item.MotivoReanudacion.Clave;
                entity.IdMotivoReanudacionNombre = item.MotivoReanudacion.Nombre;
            }

            entity.Creado = item.Creado;
            entity.IdCreadoPor = item.IdCreadoPor;
            entity.IdCreadoPorNombre = item.CreadoPor.Nombre;
            entity.RecordType = Convert.ToInt32(item.Estado);
            entity.RecordTypeName = item.Estado.ToString();
            entity.Creado = item.Creado;
            entity.IdCreadoPor = item.CreadoPor.ID;
            entity.IdCreadoPorNombre = item.CreadoPor.Nombre;
            entity.Modificado = item.Modificado;
            entity.IdModificadoPor = item.ModificadoPor.ID;
            entity.IdModificadoPorNombre = item.ModificadoPor.Nombre;

            await this.factory.GetInstance<ILogger>().AddAsync(entityName, entity);
        }

        public async Task<List<m.SCV.Interfaces.ISeguimientoAutorizado>> GetAutorizados(Dictionary<string, object> parametros)
        {
            var daoSA = Get<d.SCV.Interfaces.ISeguimientosAutorizados>();
            return await daoSA.GetAll(parametros);
        }

        #endregion

        #region SEGUIMIENTO V2
        public async Task<List<m.SCV.Interfaces.ISeguimiento>> GetFasesSeguimientos(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAll(parametros);
        }
        #endregion

        #region DOCUMENTOS
        public async Task<object[]> getSeguimientoDocumentos(int IdSeguimiento, int IdEtapa)
        {
            var usuario = await base.getUser();
            return await this.dao.getSeguimientoDocumentos(IdSeguimiento, IdEtapa, usuario.IdPosicion);
        }
        #endregion

        #region PROCESOS
        public async Task<object[]> getSeguimientoProcesos(int IdSeguimiento, int IdEtapa)
        {
            var usuario = await base.getUser();
            return await this.dao.getSeguimientoProcesos(IdSeguimiento, IdEtapa, usuario.IdPosicion, base.getUserId());
        }

        public async Task<List<m.SCV.Interfaces.ISeguimientoProceso>> ObtenerSeguimientoProcesos( int idExpediente, int idSeguimiento, int idEtapa)
        {
            return await this.dao.ObtenerSeguimientoProceso( idExpediente, idSeguimiento, idEtapa);
        }
        // BP para ejecutar procesos automáticos/manuales de un orden del seguimiento
        public async Task EjecutarProcesos(int idSeguimiento, int orden, string responsable, string evento)
        {
            try
            {
                //BeginTransaction();

                var usuario = await base.getUser();

                var parameters = new Dictionary<string, object>() {
                    { "IdSeguimiento", idSeguimiento },
                    { "Orden", orden },
                    { "Responsable", responsable },
                    { "Evento", evento },
                    { "IdPosicion", usuario.IdPosicion },
                    { "ModificadoPor", base.getUserId() }
                };

                var procesos = await this.dao.GetProcesos(parameters);

                if (procesos != null && procesos.Count > 0)
                {
                    foreach (var p in procesos)
                    {
                        await this.EjecutarProceso(p, null);
                    }
                }

                //Commit();
            }
            catch (Exception ex)
            {
                //Rollback();
                throw ex;
            }
        }

        // Process execution
        // EstatusProceso: E EJECUTADO | P PENDIENTE | F FALLIDO
        public async Task<m.SCV.Interfaces.ISeguimientoProceso> EjecutarProceso(m.SCV.Interfaces.ISeguimientoProceso item, bool? transact)
        {
            var retValue = Get<m.SCV.Interfaces.ISeguimientoProceso>();
            int retornoValidacion = 0;

            try
            {
                BeginTransaction(true);

                //Iniciar Estatus Sin Iniciar
                string claveEstatus = "B";

                int count = 0;
                int maxTries = 1;

                if ((item.EstatusProceso.Clave == "B") && (item.Proceso.Responsable == "Usuario"))
                {
                    var parametros = new Dictionary<string, object>()
                    {
                        { "Id", item.IdSeguimientoEtapa },
                        { "ModificadoPor",  base.getUserId()},
                        { "OperacionEspecificaSP", "CATALOGO_GENERAL" }
                    };

                    ////{obtener información de la etapa a autorizar}
                    var etapa = await this.dao.GetEtapa(parametros);

                    retornoValidacion = await validarRequisitos(etapa);
                    if (retornoValidacion > 0)
                    {
                        retValue.Estado = m.Kontrol.KontrolEstadosEnum.Fallido;
                        return retValue;

                    }
                }
                var bpMetodos = Get<p.SCV.Interfaces.ICalculoProcesos>();
                bpMetodos.DaoBase = this.daoBase;
                bpMetodos.Inicializar();

                var command = bpMetodos.GetCommand(item.Proceso.Clave);
                //
                if (command != null)
                {
                    await command(item);
                }

                claveEstatus = "E";

                //while (true)
                //{
                //    try
                //    {
                //        // Initiate the asychronous call.
                       
                //        break;
                //    }
                //    catch
                //    {
                //        if (++count == maxTries)
                //        {
                //            claveEstatus = "F";
                //            break;
                //        }
                //    }
                //}

                retValue = await this.UpdateExpedienteProceso(item, claveEstatus);

                /*Registro en bitacora de ejecucion de proceso*/
                var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                await bpBitacora.SaveBitacora("Ejecución de proceso " + item.Proceso.Nombre, "seguimientos", "CATBT-SI-EP", item.ID.Value, "Expediente", item.IdExpediente.Value,null);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();

                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.ISeguimientoProceso> getExpedienteProceso(int idExpediente, string procesoClave)
        {
            var usuario = await base.getUser();

            var parametros = new Dictionary<string, object>()
            {
                { "IdExpediente", idExpediente },
                { "ProcesoClave", procesoClave },
                { "IdPosicion", usuario.IdPosicion },
                { "ModificadoPor", base.getUserId() },
                { "Operacion", "CONSULTAR_EXPEDIENTE_PROCESOS"}
            };

            return await this.dao.GetProceso(parametros);
        }

        public async Task<List<m.SCV.Interfaces.ISeguimientoProceso>> GetExpedienteProcesos(int idExpediente)
        {
            var usuario = await base.getUser();

            var parametros = new Dictionary<string, object>()
            {
                { "IdExpediente", idExpediente },
                { "ProcesoClave", null },
                { "IdPosicion", usuario.IdPosicion },
                { "ModificadoPor", base.getUserId() },
                { "Operacion", "CONSULTAR_EXPEDIENTE_PROCESOS"}
            };

            return await this.dao.GetProcesos(parametros);
        }


        public async Task<m.SCV.Interfaces.ISeguimientoProceso> UpdateExpedienteProceso(m.SCV.Interfaces.ISeguimientoProceso item, string claveEstatus)
        {
            BeginTransaction(true);
            var retValue = Get<m.SCV.Interfaces.ISeguimientoProceso>();

            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", item.ID);
                parameters.Add("IdModificadoPor", base.getUserId());
                parameters.Add("claveEstatusProceso", claveEstatus);
                parameters.Add("OperacionEspecificaSP", "EJECUCION_PROCESO");

                //{guardar el proceso}
                int id = await this.dao.SaveProceso(parameters);

                var usuario = await base.getUser();

                //{preparar paramatros para leer proceso}
                parameters.Clear();
                parameters.Add("Id", (item.ID == null) || (item.ID <= 0) ? id : item.ID);
                parameters.Add("IdPosicion", usuario.IdPosicion);
                parameters.Add("ModificadoPor", base.getUserId());

                //{leer proceso por id}
                retValue = await this.dao.GetProceso(parameters);
                retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                Commit();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<bool> ValidarProceso(int idExpediente, string claveProceso, string claveEstatus)
        {
            bool retValue = false;

            //{obtener el proceso}
            var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();
            var proceso = await bpSeguimientos.getExpedienteProceso(idExpediente, claveProceso);
            if (proceso != null)
            {
                //consultar el estatus parametrizado de proceso
                var bpEstatusProceso = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusProceso = await bpEstatusProceso.Get("SCVSEGESTATUSPROCESO", claveEstatus);
                if (proceso.IdEstatusProceso == estatusProceso.ID)
                {
                    retValue = true;
                }
            }

            return retValue;
        }

        #endregion

        #region REQUISITOS
        public async Task<object[]> getSeguimientoRequisitos(int IdSeguimiento, int IdEtapa)
        {
            var usuario = await base.getUser();
            return await this.dao.getSeguimientoRequisitos(IdSeguimiento, IdEtapa, usuario.IdPosicion, base.getUserId());
        }

        public virtual async Task<int> validarRequisitos(m.SCV.Interfaces.ISeguimientoEtapa item)
        {
            int retValue = 0;
            var usuario = await base.getUser();

            //  verifica que no existan requisitos pendientes en la etapa
            retValue = await dao.getRequisitosPendienteEtapa(item, "VERIFICAR_REQUISITOS_PENDIENTES", usuario.IdPosicion, base.getUserId());
            if (retValue > 0)
            {
                base.SetReturnInfo(retValue, "Existe(n)  " + retValue + "  requisito(s) pendiente(s)");
                return retValue;
            }

            retValue = await dao.getRequisitosPendienteEtapa(item, "VERIFICAR_REQUISITOS_VENCIDOS", usuario.IdPosicion, base.getUserId());
            if (retValue > 0)
            {
                base.SetReturnInfo(retValue, "Existe(n)  " + retValue + "  requisito(s) vencidos(s), en la etapa actual o en etapas anteriores");
                return retValue;
            }

            //validar que todos los requisitos de la etapa estén autorizados (2018/03/26)
            retValue = await dao.getRequisitosPendienteEtapa(item, "VERIFICAR_REQUISITOS_POR_AUTORIZAR", usuario.IdPosicion, base.getUserId());
            if (retValue > 0)
            {
                base.SetReturnInfo(retValue, "Existe(n)  " + retValue + "  requisito(s) pendiente(s) por autorizar");
                return retValue;
            }

            return retValue; // sin mensaje
        }

        public async Task<m.SCV.Interfaces.ISeguimientoRequisito> SaveRequisito(m.SCV.Interfaces.ISeguimientoRequisito item)
        {
            var retValue = this.factory.GetInstance<m.SCV.Interfaces.ISeguimientoRequisito>();

            try
            {
                BeginTransaction();

                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", item.IdRequisito);
                parameters.Add("Valor", item.Valor);
                parameters.Add("ModificadoPor", base.getUserId());
                parameters.Add("OperacionEspecificaSP", "CAPTURA_REQUISITO");
                parameters.Add("FechaVencimiento", item.FechaVencimiento);
                parameters.Add("IdExpediente", item.IdExpediente);

                await this.dao.SaveRequisito(parameters);

                var usuario = await base.getUser();

                parameters.Clear();
                parameters.Add("Id", item.ID.Value);
                parameters.Add("OperacionEspecificaSP", "REQUISITO_UNICO_POR_EXPEDIENTE");
                parameters.Add("ModificadoPor", base.getUserId());
                parameters.Add("IdPosicion", usuario.IdPosicion);

                retValue = await this.dao.GetRequisito(parameters);

                if (retValue.WorkFlow != null && retValue.WorkFlow.ID > 0)
                {
                    var seguimiento = await this.dao.GetById(item.IdSeguimiento);
                    int idUsuario = seguimiento.Posicion.IdUsuario ?? 0;
                    if (idUsuario > 0)
                    {
                        retValue = await this.UpdateEstatusRequisito(retValue.IdExpediente, retValue.IdRequisito, retValue.ID.Value, "D");
                        await StartWorkflow(retValue.WorkFlow.Clave, retValue, idUsuario);
                    }
                    else
                    {
                        base.SetReturnInfo(1, "La posición del Responsable del seguimiento no tiene un usuario asignado.");
                        return retValue;
                    }
                }

                await LogEvent(retValue.IdRequisito, 1100, "El requisito fue actualizado exitosamente");

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }


        public async Task<m.SCV.Interfaces.ISeguimientoRequisito> UpdateEstatusRequisito(int idExpediente, int idRequisito, int id, string clave)
        {
            m.SCV.Interfaces.ISeguimientoRequisito retValue = null;

            try
            {
                BeginTransaction();

                //{consultar estatus requisito autorizado}
                var bpEstatusRequisito = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusRequisito = await bpEstatusRequisito.Get("SCVSEGESTATUSREQUISITOS", clave);

                //{consultar estatus bitacora}
                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                var parametros = new Dictionary<string, object>(){
                    { "Id", idRequisito },
                    { "IdExpediente", idExpediente },
                    { "IdEstatus", estatus.ID },
                    { "IdEstatuRequisito", estatusRequisito.ID },
                    { "ModificadoPor", base.getUserId()},
                    { "OperacionEspecificaSP", "ACTUALIZAR_ESTATUS_REQUISITO"}
                };

                await this.dao.SaveRequisito(parametros);

                var usuario = await base.getUser();

                parametros.Clear();
                parametros.Add("Id", id);
                parametros.Add("OperacionEspecificaSP", "REQUISITO_UNICO_POR_EXPEDIENTE");
                parametros.Add("ModificadoPor", base.getUserId());
                parametros.Add("IdPosicion", usuario.IdPosicion);

                retValue = await this.dao.GetRequisito(parametros);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.ISeguimientoRequisito> getExpedienteRequisito(int idExpediente, string requisitoClave)
        {
            var usuario = await base.getUser();
            var parametros = new Dictionary<string, object>()
            {
                { "IdExpediente", idExpediente},
                { "RequisitoClave", requisitoClave},
                { "OperacionEspecificaSP", "CONSULTAR_EXPEDIENTE_REQUISITOS"},
                { "ModificadoPor", base.getUserId() },
                { "IdPosicion", usuario.IdPosicion }
            };

            return await this.dao.GetRequisito(parametros);
        }
        #endregion

        #region ETAPAS
        public async Task<List<m.SCV.Interfaces.ISeguimientoEtapa>> getSeguimientoEtapas(int IdSeguimiento)
        {
            var usuario = await base.getUser();
            return await this.dao.getSeguimientoEtapas(IdSeguimiento, usuario.IdPosicion, base.getUserId());
        }

        public async Task<m.SCV.Interfaces.ISeguimientoEtapa> UpdateEstatusEtapa(int idEtapa, string clave)
        {
            m.SCV.Interfaces.ISeguimientoEtapa retValue = null;

            try
            {
                BeginTransaction();

                var p = new Dictionary<string, object>(){
                    { "Id", idEtapa},
                    { "ClaveEstatusEtapa", clave},
                    { "ModificadoPor", base.getUserId()},
                    { "OperacionEspecificaSP", "UPDATE_ESTATUS_ETAPA"}
                };

                int id = await this.dao.SaveEtapa(p);

                var usuario = await base.getUser();

                p.Clear();
                p.Add("Id", id);
                p.Add("ModificadoPor", base.getUserId());
                p.Add("OperacionEspecificaSP", "CATALOGO_GENERAL");
                p.Add("IdPosicion", usuario.IdPosicion);

                retValue = await this.dao.GetEtapa(p);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public virtual async Task<object> setAvanzarEtapa(m.SCV.Interfaces.ISeguimientoEtapa item) {
            return await this.verificaAvanzarEtapa(item, true);
        }

        public virtual async Task<object> VerificaAvanzarEtapa(m.SCV.Interfaces.ISeguimientoEtapa item) {
            return await this.verificaAvanzarEtapa(item, false);
        }

        private async Task<object> verificaAvanzarEtapa(m.SCV.Interfaces.ISeguimientoEtapa item, bool shouldStop)
        {
            bool etapaCerrada = true;
            int retValue = -1;
            int modificadoPor = base.getUserId();
            var retornoValores = new RetornoValoresEtapa();

            try
            {
                BeginTransaction(true);

                //{usuario logeado}
                var usuario = await base.getUser();

                //{consultar el seguimiento de expediente de la etapa(s) actual(es)}
                var seguimiento = await this.dao.GetById(item.IdSeguimiento);
                if (seguimiento.IdPosicion == null)
                {
                    if (shouldStop)
                    {
                        base.SetReturnInfo(retValue, "Error, No se puede avanzar la etapa, porque la Fase no posee un responsable");
                    }
                    return retornoValores;
                }

                //{permite buscar cual es el orden la etapa}
                int currentOrden = await dao.getOrdenEtapa(item, "OBTENER_ORDEN_SEGUIMIENTO", usuario.IdPosicion, base.getUserId());
                //
                retValue = await this.validarRequisitos(item);
                if (retValue > 0)
                {
                    etapaCerrada = false;
                    return retornoValores;
                }

                //{permite verificar si existen proceso de tipo de usuario pendientes por ejecutar}
                retValue = await dao.getProcesosPendienteEtapa(item, "CONSULTAR_PROCESOS_PENDIENTES_ETAPA", usuario.IdPosicion, base.getUserId());
                if (retValue > 0)
                {
                    etapaCerrada = false;
                    if (shouldStop)
                    {
                        Rollback();

                        base.SetReturnInfo(retValue, "Error, Existen Procesos pendientes por ejecutar");
                    }
                    return retornoValores;
                }

                //{ejecuta los procesos de cierre relacionado a la etapa actual}
                await this.EjecutarProcesos(item.IdSeguimiento, currentOrden, RESPONSABLE_SISTEMA, EVENTO_FINALIZAR_ETAPA);

                //{instantaneas solo se capturan en la fase-venta}
                //if (seguimiento.Fase.Clave == "FASE-VENT")
                //{
                //    // registrar capturas de agentes en relacion al orden-fin en el seguimiento de expediente

                //}
                //Se guardan instantaneas en todas las fases
                if (etapaCerrada)
                {
                    var bpInstantaneas = Get<p.SCV.Interfaces.IExpedientesInstantaneas>();
                    await bpInstantaneas.SaveInstantaneasAll(item.IdSeguimiento, currentOrden, "FECHAFIN");
                }



                //{actualiza el estatus a la etapa actual}
                retValue = await dao.setAvanzarEtapa(item, "CERRAR_ETAPA_ACTUAL", modificadoPor);
                if (retValue > 0)
                {
                    Rollback();
                    if (shouldStop)
                    {
                        base.SetReturnInfo(retValue, "Error cerrando la etapa");
                        //
                        return retornoValores;
                    }
                    else {
                        throw new ApplicationException("Error cerrando la etapa");
                    }
                }

                //{activa la siguiente etapa}
                int nextOrden = await dao.setAvanzarEtapa(item, "INICIAR_ETAPA_SIGUIENTE", modificadoPor);
                if (nextOrden == 0)
                {
                    var seguimientoNextFase=await this.AvanzarSeguimiento(seguimiento);
                    //
                    if (shouldStop)
                    {
                        retornoValores.Id = 5;
                        retornoValores.Nombre = "ETAPA FINAL DEL SEGUIMIENTO DE EXPEDIENTE";
                        retornoValores.codigo = 25;
                        retornoValores.etapaFinal = "SI";
                        //
                        await LogEvent(item.IdSeguimiento, 1101, "Seguimiento de Expediente finalizado exitosamente");
                        //
                        base.SetReturnInfo(1000, "Seguimiento de Expediente finalizado exitosamente", 0);


                    }
                    if (seguimientoNextFase != null)
                    {
                        /*Guardar Instantaneas de la etapa iniciar de cada fase*/
                        var bpInstantaneas = Get<p.SCV.Interfaces.IExpedientesInstantaneas>();
                        await bpInstantaneas.SaveInstantaneasAll(seguimientoNextFase.ID.Value, 1, "FECHAINICIO");
                    }
                    return retornoValores;
                }

                //{inicia los requisitos de la siguiente etapa}
                retValue = await dao.setIniciarRequisitos(item, "INICIAR_REQUISITOS", modificadoPor, nextOrden);
                //
                if (retValue > 0)
                {
                    Rollback();

                    if (shouldStop)
                    {
                        base.SetReturnInfo(retValue, "Error iniciando la fecha de los requisitos");
                        //
                        return retornoValores;
                    }
                    else {
                        throw new ApplicationException("Error iniciando la fecha de los requisitos");
                    }
                }

                //{ejecuta los procesos de inicio relacionado a la siguiente etapa}
                await this.EjecutarProcesos(item.IdSeguimiento, nextOrden, RESPONSABLE_SISTEMA, EVENTO_INICIAR_ETAPA);

                //{instantaneas solo se capturan en la fase-venta}
                seguimiento = await this.dao.GetById(item.IdSeguimiento);
                //
                //if (seguimiento.Fase.Clave == "FASE-VENT")
                //{
                //{registrar capturas de agentes en relacion al orden-inicio en el seguimiento de expediente}
                //var bpInstantaneas = Get<p.SCV.Interfaces.IExpedientesInstantaneas>();
                //}

                //Se guardan instantaneas en todas las fases
                if(etapaCerrada)
                {
                    var bpInstantaneas = Get<p.SCV.Interfaces.IExpedientesInstantaneas>();
                    var proximaEtap=  await bpInstantaneas.SaveInstantaneasAll(item.IdSeguimiento, nextOrden, "FECHAINICIO");

                    /*Se avanza a la siguiente etapa el almacena evento en bitacora*/
                    string nextNombreEtapa = proximaEtap.Etapa != null ? " a "+ proximaEtap.Etapa.Nombre : "";

                    var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                    await bpBitacora.SaveBitacora("Avance de etapa  "+item.Etapa.Nombre+ nextNombreEtapa, "SeguimientoEtapa", "CATBT-SI-AE", item.ID.Value, "Expediente", seguimiento.IdExpediente, proximaEtap.ID.Value);
                }


                if (shouldStop)
                {
                    base.SetReturnInfo(1, "Etapa avanzada exitosamente", 0);
                }
                else {
                    base.SetReturnInfo(0, "", 0);
                }

                await LogEvent(item.IdSeguimiento, 1102, "Etapa avanzada exitosamente");

                Commit();

                return retornoValores;
            }
            catch(Exception ex)
            {
                Rollback();

                throw new ApplicationException("verificaAvanzarEtapa::"  + ex.Message, ex);
            }
        }

        #endregion

        #region "AUTORIZACION"

        public async Task<m.SCV.Interfaces.ISeguimiento> AvanzarSeguimiento(m.SCV.Interfaces.ISeguimiento item)
       {
            var daoFases = Get<d.SCV.Interfaces.IFasesExpediente>();
            var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
            var daoVenta = Get<d.SCV.Interfaces.IVentas>();
            var bpVenta = Get<p.SCV.Interfaces.IVentas>();

            m.SCV.Interfaces.ISeguimiento retValue = null;

            try
            {
                var parametros = new Dictionary<string, object>() { { "activos", 1 },{ "claveTipoExpediente", "V" } };
                var fases = await daoFases.GetAll(parametros);
                //
                int currentOrden = item.Fase.Orden;
                var nextFase = fases.FirstOrDefault(fase => fase.Orden == (currentOrden + 1));

                int idNextFase = nextFase != null ? nextFase.ID.Value : 0;
                    //
                    //var venta = await daoVenta.GetByExpedienteId(item.IdExpediente);
                    //var ventaVersion = await bpVenta.GetCurrentVersion((int)venta.ID);

                    //Consultar fase siguiente para obtener el esquema.
                    parametros = new Dictionary<string, object>() {
                    { "idExpediente", item.IdExpediente },
                    { "idFaseExpediente", idNextFase }
                };

                    //{obtener información del seguimiento solicitado}
                    var seguimientos = await this.GetAllByParams(parametros);
                    if (seguimientos.Count > 0)
                    {
                        retValue = seguimientos.FirstOrDefault();
                    }

                if (retValue != null && retValue.ID > 0)
                {
                    int idExpediente = item.IdExpediente;
                    int idFaseExpediente = nextFase.ID ?? 0;
                    // int idEsquema = ventaEsquema.Esquema.ID ?? 0;
                    int idEsquema = retValue.IdEsquema;
                    int idEntidadFase = retValue.Venta.ID ?? 0;
                    int idPosicion = item.Posicion.ID ?? 0;
                    //


                    /*Se avanza a la siguiente etapa el almacena evento en bitacora*/
                    await bpBitacora.SaveBitacora("Avance a " + retValue.Fase.Nombre, "seguimientos", "CATBT-SI-AF", item.ID.Value, "Expediente", idExpediente, retValue.ID.Value);



                    retValue = await this.Create(idExpediente, idFaseExpediente, idEsquema, idPosicion, idEntidadFase, null, "A");
                }
                else
                {
                    /*Se avanza a la siguiente etapa el almacena evento en bitacora*/
                    int idExpediente = item.IdExpediente;
                    await bpBitacora.SaveBitacora("Culminación del expediente", "Expediente", "CATBT-SI-CUE", item.ID.Value, "Expediente", idExpediente,null);
                }
              
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.ISeguimientoEtapa> EnviarAutorizacion(m.SCV.Interfaces.ISeguimientoEtapa item)
        {
            m.SCV.Interfaces.ISeguimientoEtapa retValue = null;

            try
            {
                int result = -1;
                var retornoValores = new RetornoValoresEtapa();
                var usuario = await base.getUser();

                BeginTransaction(true);

                var p = new Dictionary<string, object>(){
                    { "IdSeguimiento", item.IdSeguimiento},
                    { "IdEtapa", item.IdEtapa},
                    { "ModificadoPor", base.getUserId()},
                    { "OperacionEspecificaSP", "CATALOGO_GENERAL"}
                };

                // PERMITE VERIFICAR SI EXISTEN REQUISITOS PENDIENTES POR CAPTURAR O AUTORIZAR
                result = await validarRequisitos(item);
                if (result > 0)
                {
                    return retValue;
                }

                // PERMITE VERIFICAR SI EXISTEN PROCESO DE TIPO DE USUARIO PENDIENTES POR EJECUTAR
                result = await dao.getProcesosPendienteEtapa(item, "CONSULTAR_PROCESOS_PENDIENTES_ETAPA", usuario.IdPosicion, base.getUserId());
                if (result > 0)
                {
                    base.SetReturnInfo(result, "Existen Procesos pendientes por ejecutar.");
                    return retValue;
                }

                var seguimientoEtapa = await this.dao.GetEtapa(p);
                if (seguimientoEtapa.WorkFlow != null && seguimientoEtapa.WorkFlow.ID > 0)
                {
                    var seguimiento = await this.dao.GetById(item.IdSeguimiento);
                    int idUsuario = seguimiento.Posicion.IdUsuario ?? 0;
                    if (idUsuario > 0)
                    {
                        
                        await StartWorkflow(seguimientoEtapa.WorkFlow.Clave, seguimientoEtapa, idUsuario);
                        await this.UpdateEstatusEtapa(seguimientoEtapa.ID.Value, "D");
                    }
                    else
                    {
                        base.SetReturnInfo(1, "La posición del Responsable del seguimiento no tiene un usuario asignado.");
                    }
                }
                else
                {
                    //Si la etapa no tiene autorización, avanzar a siguiente etapa: 2018/04/13
                    await this.setAvanzarEtapa(seguimientoEtapa);
                }

                retValue = await this.dao.GetEtapa(p);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<p.Kontrol.WorkflowResult> Authorize(int id, Modelo.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                var parametros = new Dictionary<string, object>()
                {
                    { "Id", id },
                    { "ModificadoPor", base.getUserId() },
                    { "OperacionEspecificaSP", "CATALOGO_GENERAL" }
                };

                //{obtener información de la etapa a autorizar}
                var etapa = await this.dao.GetEtapa(parametros);

                //obtener seguimiento de la etapa a autorizar
                var seguimiento = await this.GetById(etapa.IdSeguimiento);

                //{consultar estatus seguimiento activo}
                var bpEstatusSeguimiento = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", "A");

                //{validar que el seguimiento de la etapa a cerrar se encuentre activo}
                if (seguimiento.IdEstatusSeguimiento == estatusSeguimiento.ID)
                {
                    retValue.Success = true;
                    retValue.Message = $"Se autorizó la etapa #{id}";
                    etapa = await this.UpdateEstatusEtapa(id, "C");

                    //{avanzar etapa}
                    await setAvanzarEtapa(etapa);

                    /*Registro en bitacora la autorizacion del proceso*/
                    var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                    await bpBitacora.SaveBitacora("Aprobación de solicitud de autorización", "seguimientos", "CATBT-SI-ASA", seguimiento.ID.Value, "Expediente", seguimiento.IdExpediente, null);
                }
                else
                {
                    //{retornar mensaje de error al avanzar etapa de seguimiento suspendido}
                    retValue.Success = false;
                    retValue.Message = $"La etapa #{id} no fue autorizada porque el seguimiento #{seguimiento.ID} se encuentra inactivo o está suspendido.";
                    base.SetReturnInfo(0, $"La etapa #{id} no fue autorizada porque el seguimiento #{seguimiento.ID} se encuentra inactivo o está suspendido.");
                }

                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return retValue;
        }

        public async Task<p.Kontrol.WorkflowResult> Reject(int id, Modelo.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                var parametros = new Dictionary<string, object>()
                {
                    { "Id", id },
                    { "ModificadoPor", base.getUserId() },
                    { "OperacionEspecificaSP", "CATALOGO_GENERAL" }
                };

                //{obtener información de la etapa a autorizar}
                var etapa = await this.dao.GetEtapa(parametros);

                //obtener seguimiento de la etapa a autorizar
                var seguimiento = await this.GetById(etapa.IdSeguimiento);


                retValue.Success = true;
                retValue.Message = $"Se rechazó la etapa #{id}";
                await this.UpdateEstatusEtapa(id, "A");


                /*Registro en bitacora la autorizacion del proceso*/
                var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                await bpBitacora.SaveBitacora("Rechazo de solicitud de autorización", "seguimientos", "CATBT-SI-ASA", seguimiento.ID.Value, "Expediente", seguimiento.IdExpediente, null);

                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return retValue;
        }

        public override async Task<string> GetDescripcion(dynamic obj)
        {
            var plantilla = await GetPlantilla("AUT-EXP", obj, null);
            return plantilla.ToString();
        }

        public async Task<m.SCV.Interfaces.ISeguimiento> UpdateSeguimiento(m.SCV.Interfaces.ISeguimiento item, string claveEstatus)
        {
            var retValue = Get<m.SCV.Interfaces.ISeguimiento>();
            var bpBitacora = Get<EK.Procesos.Kontrol.Interfaces.IBitacora>();

            try
            {
                int id = item.ID ?? 0;

                //{respaldar seguimiento}
                var seguimientosDAO = Get<d.SCV.Interfaces.ISeguimientos>();
                retValue = await seguimientosDAO.GetById(id);


                /*Consultar expediente*/
                var daoExpediente = Get<d.SCV.Interfaces.IExpedientes>();
                var expediente = await daoExpediente.GetById(retValue.IdExpediente);


                int idCliente = (int)expediente.IdCliente;
                int idExpediente = (int)expediente.ID;
                int idSeguimiento = (int)retValue.ID;


                //{consultar estatus alta}
                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusAlta = await bpEstatus.Get("ESTATUS", "A");
                int idEstatus = estatusAlta.ID ?? 0;

                //{consultar fase venta}
                var bpFaseVenta = Get<p.SCV.Interfaces.IFasesExpediente>();
                var faseVenta = await bpFaseVenta.GetByClave("FASE-VENT");
                int idFaseVenta = faseVenta.ID ?? 0;

                //{consultar estatus seguimiento}
                var bpEstatusSeguimiento = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", claveEstatus);
                int idEstatusSeguimiento = estatusSeguimiento.ID ?? 0;

                //{procesar la cancelacion del sguimiento}
                if ("C".Equals(claveEstatus))
                {
                    ////{cancelación de comisiones solo en fase de venta}
                    //if (item.IdFase == idFaseVenta)
                    //{
                    //    var bpComisiones = Get<p.SCV.Interfaces.IConfiguracionComisiones>();
                    //    int retornoC = await bpComisiones.cancelarComisionesSeguimiento(id);

                    //    //{rollback a la transaccion externa}
                    //    if (retornoC < 0)
                    //    {
                    //        base.SetReturnInfo(1, "Error al cancelar comisiones del seguimiento " + id + " del expediente " + item.IdExpediente);
                    //        return null;
                    //    }
                    //}

                    //{cancelación no lleva fecha de vigencia}
                    item.VigenciaEstatus = null;

                    var estatusBaja = await bpEstatus.Get("ESTATUS", "B");
                    idEstatus = estatusBaja.ID ?? 0;




                }

                Dictionary<string, object> p = new Dictionary<string, object>();
                p.Add("Id", item.ID);
                p.Add("VigenciaEstatus", item.VigenciaEstatus);
                p.Add("IdMotivoSuspension", item.IdMotivoSuspension);
                p.Add("IdMotivoCancelacion", item.IdMotivoCancelacion);
                p.Add("IdMotivoReanudacion", item.IdMotivoReanudacion);
                p.Add("IdEstatusSeguimiento", idEstatusSeguimiento);
                p.Add("IdEstatus", idEstatus);
                p.Add("Justificacion", item.Justificacion);
                p.Add("ModificadoPor", base.getUserId());
                p.Add("OperacionEspecificaSP", "ACTUALIZAR_MOTIVO_SUSPENSION");

                //{actualizar el seguimiento}
                await seguimientosDAO.Save(p);

                //{consultar el seguimiento actualizado}
                var bajaItem = await seguimientosDAO.GetById(id);
                if (bajaItem == null)
                {
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Eliminado;
                    retValue.Response = claveEstatus;
                }
                else
                {
                    retValue = bajaItem;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    retValue.Response = claveEstatus;
                }

                switch (claveEstatus)
                {

                    case "A":
                        /*CANCELACION EXPEDIENTE*/
                        await bpBitacora.SaveBitacora("Reanudación del expediente", "Expediente", "CATBT-SI-RE", idSeguimiento, "Expediente", idExpediente, null);

                        await bpBitacora.SaveBitacora("Reanudación del expediente "+ idExpediente, "scvclientes", "CATBT-SI-RE", idCliente, "scvclientes", idCliente, null);

                        await LogEvent(id, 1104, "Seguimiento Reanudado");

                        break;
                    case "C":
                        await bpBitacora.SaveBitacora("Cancelación del expediente", "Expediente", "CATBT-SI-CAE", idSeguimiento, "Expediente", idExpediente, null);

                        await bpBitacora.SaveBitacora("Cancelación del expediente "+idExpediente, "scvclientes", "CATBT-SI-CAE", idCliente, "scvclientes", idCliente, null);

                        await LogEvent(id, 1105, "Seguimiento Cancelado");
                        break;
                    case "F":
                        await bpBitacora.SaveBitacora("Culminación de Seguimiento", "Expediente", "CATBT-SI-CUE", idSeguimiento, "Expediente", idExpediente, null);

                        await bpBitacora.SaveBitacora("Culminación del expediente "+idExpediente, "scvclientes", "CATBT-SI-CUE", idCliente, "scvclientes", idCliente, null);

                        await LogEvent(id, 1104, "Seguimiento Finalizado");
                        break;
                    case "S":
                        await bpBitacora.SaveBitacora("Suspensión del seguimiento", "Expediente", "CATBT-SI-SE", idSeguimiento, "Expediente", idExpediente, null);

                        await bpBitacora.SaveBitacora("Suspensión del expediente "+idExpediente, "scvclientes", "CATBT-SI-SE", idCliente, "scvclientes", idCliente, null);

                        await LogEvent(id, 1103, "Seguimiento Suspendido");
                        break;
                    default:
                        break;
                }

                await Log(retValue);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        #endregion

        #region PLANTILLAS

        public async Task<m.Kontrol.Interfaces.IKontrolFile> GenerarDocumento(m.SCV.Interfaces.ISeguimientoDocumento item)
        {
            var retValue = Get<m.Kontrol.Interfaces.IKontrolFile>();

            try
            {
                BeginTransaction(true);

                var daoDocumentos = Get<d.SCV.Interfaces.IDocumentosExpediente>();
                var documento = await daoDocumentos.GetById(item.IdDocumento);

                var bpExpedientes = Get<p.SCV.Interfaces.IExpedientes>();
                dynamic obj = await bpExpedientes.GetExpedienteObject(0, "venta", (int)item.IdExpediente);

                var daoMonedas = Get<d.Kontrol.Interfaces.IMonedas>();
                m.Kontrol.Interfaces.IMoneda moneda = await daoMonedas.GetById((int)obj.Desarrollo.IdMoneda);

                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla(documento.Plantilla.Clave, obj, null, moneda);
                EK.Drivers.Common.IKontrolFiles kf = plantilla.GetDocument(true, plantilla, obj, this.factory, moneda);
                var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
                //
                retValue = await bpFiles.CreateDocumento("seguimiento$documentos", (int)item.ID, "plantillas", "scv", kf);
                //
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                base.SetReturnInfo(2, "Se produjo un error al generar el documento: " + ex.Message);
            }

            return retValue;
        }

        #endregion



        #region SEGUIMIENTO DOCUMENTOS

        public async Task<m.Kontrol.Interfaces.IKontrolFile> GetLastVersionDocumento(Dictionary<string,object> parametros)
        {
            var retValue = Get<m.Kontrol.Interfaces.IKontrolFile>();

            try
            {
                BeginTransaction(true);

                var daoKontrolFile = Get<d.Kontrol.Interfaces.IKontrolFiles>();
                parametros.Add("entityType ", "seguimiento$documentos");
                parametros.Add("modulo", "scv");
                parametros.Add("tipo ", "plantillas");
                parametros.Add("versioning ", 1);

                var result = await daoKontrolFile.GetAll(parametros);

                if (result != null && result.Count() > 0)
                {
                    var ordenado = result.OrderByDescending(x => x.FileVersion).ToList();
                    retValue = ordenado.FirstOrDefault();
                }
                
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                base.SetReturnInfo(2, "Se produjo un error al obtener el documento: " + ex.Message);
            }

            return retValue;
        }

        #endregion
    }
}