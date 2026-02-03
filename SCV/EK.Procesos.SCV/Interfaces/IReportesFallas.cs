using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ReportesFallas")]
    public interface IReportesFallas
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IReporteFalla>
    {
        Task<m.SCV.Interfaces.IReporteFalla> LoadReporte(int idPrereporte);
        Task<m.SCV.Interfaces.IUbicaciones> GetUbicacionById(int id);
        Task<List<m.SCV.Interfaces.IClienteContactos>> GetContactoCliente(int idCliente);
        Task<List<m.SCV.Interfaces.IClienteContactos>> GetOnlycontactosAdicionalesCliente(int idCliente);
        Task<m.SCV.Interfaces.IClienteSPVEtapa> GetClienteEtapa(int idCliente, DateTime fechaReporte);
        Task<List<m.SCV.Interfaces.IComponente>> GetComponentes(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IReporteFallaDetalle> CalcularPartida(m.SCV.Interfaces.IReporteFallaDetalle partida, m.SCV.Interfaces.IReporteFalla reporte);
        Task<m.SCV.Interfaces.IReporteFallaDetalle> AutorizarPartidasSinGarantia(dynamic parametros);
        Task<m.SCV.Interfaces.IReporteFallaDetalle> CalcularReincidencias(m.SCV.Interfaces.IReporteFallaDetalle partida);
        Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> GetReincidencias(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> GetNotificacionReincidencias(Dictionary<string, object> parametros);
        Task<object[]> GetClienteReportes(int idCliente);
        Task<List<m.SCV.Interfaces.IOrdenTrabajoRUBA>> GetOrdenesTrabajo(Dictionary<string, object> parametros);
        //Task<string> GetEncodedDocumentOT(dynamic obj);
        //Task<string> GetEncodedDocumentOT(int id);
        Task<string> GetEncodedDocumentDiagnostico(int id);
        Task<string> GetEncodedDocumento(string accion, int id);
        //Task<Drivers.Common.IKontrolFiles> GetDocumentOT(dynamic obj);
        Task<string> GetDocumentOTHtml(dynamic obj);
        Task<Drivers.Common.IKontrolFiles> GetDocumentOT(int id);
        Task<Drivers.Common.IKontrolFiles> GetDocumentDiagnostico(int id);
        Task<string> GetDocumentDiagnosticoHtml(int id);
        Task<List<m.SCV.Interfaces.IDiagnosticosImagenesCAT>> GetDiagnosticateImageCAT(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IDiagnosticosNotaCAT>> GetDiagnosticateNoteCAT(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDiagnosticosImagenesCAT>> GetPathDiagnosticateImageCAT(int id);
        Task<List<m.SCV.Interfaces.IContratista>> GetContratistas(int idReporte);
        Task<List<m.SCV.Interfaces.IEvidenciaDiagnostico>> GetEvidencias(int idReporte);
        Task<List<m.SCV.Interfaces.IAgendaContratista>> GetHistorialFechasOT(int idReporte);
       // Task<List<m.SCV.Interfaces.IListaCatsCorreo>> GetCatsParaEnviarCorreo();
        Task<List<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBA>> CalcularPartidasOT(int idReporte, int idContratista, m.SCV.Interfaces.IOrdenTrabajoRUBA orden, List<m.SCV.Interfaces.IOrdenTrabajoRUBA> ordenes);
        Task<m.SCV.Interfaces.IReporteFalla> CerrarReporte(int id);
        Task<m.SCV.Interfaces.IReporteFalla> CancelaReporte(string motivo);
        Task<bool> VerificarPlantilla(string Nombre);
        Task<m.SCV.Interfaces.IReporteFalla> TryCerrarReporte(m.SCV.Interfaces.IReporteFalla item, string estatus, bool validate,bool CancelarNoProcede, List<m.SCV.Interfaces.IReporteFallaDetalle> partidas, List<m.SCV.Interfaces.IReporteDictamen> dictamenes);
        Task<m.SCV.Interfaces.IReporteFalla> ReverseReporteFallas(m.SCV.Interfaces.IReporteFalla item);
        void CalcularTiemposReparacion(ref m.SCV.Interfaces.IReporteFalla item);
        Task<string> RequestURI(string uri, object obj);
        Task<Drivers.Common.IKontrolFiles> GetFormalizacionVenta(int idCliente);
        Task<Drivers.Common.IKontrolFiles> GetEquipamientoVivienda(int idCliente);
        Task<object> ValidateSecurityQuestions(int idCliente, Dictionary<string, object> questions);
        Task<m.SCV.Interfaces.IClienteContactos> SaveEmailGarantias(m.SCV.Interfaces.IClienteContactos item);

        Task<List<m.SCV.Interfaces.IAgendaDictamenDetalle>> GetDictamenes(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IReporteDictamen>> GetDictamenesReporte(Dictionary<string, object> parametros); 

        #region DASHBOARD
        Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getStateDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getUsersDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ITopReport>> getTopReportDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteFalla>> getGridDashBoard(Dictionary<string, object> parametros);
        #endregion DASHBOARD
    }
}