using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using mk = EK.Modelo.Kontrol;
using m = EK.Modelo.SCV;

namespace EK.Procesos.SCV.Interfaces
{
    [mk.KontrolName("SCVSeguimientos")]
    public interface ISeguimientos : Kontrol.Interfaces.IBaseProceso
    {
        #region SEGUIMIENTO
        Task<object[]> GetAll(int activos);
        Task<m.Interfaces.ISeguimiento> GetSeguimientoActivo(int idExpediente);
        Task<mk.Interfaces.IPosicion> GetAgenteSeguimientoActivo(int idExpediente);
        Task<m.Interfaces.ISeguimiento> GetSeguimientoByFase(int idExpediente, string faseClave);
        Task<List<m.Interfaces.ISeguimiento>> GetAllByParams(Dictionary<string, object> parametros);
        Task<m.Interfaces.ISeguimiento> GetById(int id);
        Task<m.Interfaces.ISeguimiento> Create(int idExpediente, int idFaseExpediente, int idEsquema, int idPosicion, int idEntidadFase, DateTime? fechaEstimada, string claveEstatusSeguimiento);
        Task<m.Interfaces.ISeguimiento> Save(m.Interfaces.ISeguimiento item);
        Task<m.Interfaces.ISeguimiento> SaveSuspension(m.Interfaces.ISeguimiento item, string claveEstatus);
        Task<m.Interfaces.ISeguimiento> UpdateSeguimiento(m.Interfaces.ISeguimiento item, string claveEstatus);
        Task<List<m.Interfaces.ISeguimientoAutorizado>> GetAutorizados(Dictionary<string, object> parametros);
        Task<m.Interfaces.ISeguimiento> AvanzarSeguimiento(m.Interfaces.ISeguimiento item);
        Task<object> VerificaAvanzarEtapa(m.Interfaces.ISeguimientoEtapa item);

        #endregion

        #region DOCUMENTOS
        Task<object[]> getSeguimientoDocumentos(int IdSeguimiento, int IdEtapa);
        #endregion

        #region PROCESOS
        Task<List<m.Interfaces.ISeguimientoProceso>> ObtenerSeguimientoProcesos(int idExpediente,int idSeguimiento, int idEtapa);
        Task<object[]> getSeguimientoProcesos(int IdSeguimiento, int IdEtapa);
        Task EjecutarProcesos(int idSeguimiento, int orden, string responsable, string evento);
        Task<m.Interfaces.ISeguimientoProceso> EjecutarProceso(m.Interfaces.ISeguimientoProceso item, bool? transact);
        Task<m.Interfaces.ISeguimientoProceso> getExpedienteProceso(int idExpediente, string procesoClave);
        Task<List<m.Interfaces.ISeguimientoProceso>> GetExpedienteProcesos(int idExpediente);
        Task<m.Interfaces.ISeguimientoProceso> UpdateExpedienteProceso(m.Interfaces.ISeguimientoProceso item, string claveEstatus);
        Task<bool> ValidarProceso(int idExpediente, string claveProceso, string claveEstatus);
        #endregion

        #region REQUISITOS
        Task<object[]> getSeguimientoRequisitos(int IdSeguimiento, int IdEtapa);
        Task<m.Interfaces.ISeguimientoRequisito> SaveRequisito(m.Interfaces.ISeguimientoRequisito item);
        Task<m.Interfaces.ISeguimientoRequisito> getExpedienteRequisito(int idExpediente, string requisitoClave);
        Task<m.Interfaces.ISeguimientoRequisito> UpdateEstatusRequisito(int idExpediente, int idRequisito, int id, string clave);
        #endregion

        #region ETAPAS
        Task<List<m.Interfaces.ISeguimientoEtapa>> getSeguimientoEtapas(int IdSeguimiento);
        Task<m.Interfaces.ISeguimientoEtapa> UpdateEstatusEtapa(int idEtapa, string clave);
        Task<object> setAvanzarEtapa(m.Interfaces.ISeguimientoEtapa item);
        #endregion

        #region AUTORIZACION
        Task<m.Interfaces.ISeguimientoEtapa> EnviarAutorizacion(m.Interfaces.ISeguimientoEtapa item);
        #endregion

        #region PLANTILLAS
        Task<mk.Interfaces.IKontrolFile> GenerarDocumento(m.Interfaces.ISeguimientoDocumento item);
        #endregion
    }
}