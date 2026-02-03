using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReportesFallas
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IReporteFalla>
    {
        Task<m.SCV.Interfaces.IFalla> GetFallaPartida(int idFalla, int idTipoFalla);
        Task<List<m.SCV.Interfaces.IComponente>> GetComponentes(Dictionary<string, object> parametros);
        Task<int> ValidarEntregaVivienda();
        Task<int> GetClienteReportesCount(int idCliente);
        Task<object[]> GetClienteReportes(int idCliente);
        Task<m.SCV.Interfaces.IReporteFalla> GetByEntityId(int id);
        Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> GetReincidencias(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IContratista>> GetContratistas(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IEvidenciaDiagnostico>> GetEvidencias(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IAgendaContratista>> GetHistorialFechasOT(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IListaCatsCorreo>> GetCatsParaEnviarCorreo();
        Task<string> GetRutaFirmas();
        Task<string> GetRutaFirmas(string file);
        Task<int> ActualizarCorreoEnviadoCat(int IdResponsableDictamen);
        Task<m.SCV.Interfaces.IBitacoraAutorizacionIncidencia> SaveBitacoraAutorizacion(Dictionary<string, object> parametros);
        Task<object> ChangeContratistaOTClosed(Dictionary<string, object> parametros);

        Task<object[]> Search(Dictionary<string, object> parametros);
        Task<int> ValidarResponsablePlaza(string idPlaza);
        Task<dynamic> GetTerminoGarantia(int idCliente);
        Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> GetNotificacionReincidencias(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IMotivosCancelacion>> GetMotivosCancelacionFolio();
        Task<int> CancelarDetallesFolio(string folio);
        Task<int> GuardarIncidenciaNoVigente(Dictionary<string, object> parametros);
        Task<int> GuardarIncidenciasEntrega(Dictionary<string, object> parametros);
        Task<int> updateIncidenciasEntrega(Dictionary<string, object> parametros);
        //Task<bool> GuardarIncidenciaNoVigente(m.SCV.Interfaces.IReporteFalla reporteFalla);
        Task<int> SaveTempImg(string img);
        Task<int> SaveEvidenciaCliente(Dictionary<string, object> parametros);
        Task<object[]> GetEvidenciasCliente(Dictionary<string, object> parametros);
        Task<object[]> GetIncidenciasEntregaCliente(Dictionary<string, object> parametros);
        Task<int> DeleteEvidenciaCliente(Dictionary<string, object> parametros);
        Task<string> GetIndicadorCliente(Dictionary<string, object> parametros);

        #region DASHBOARD
        Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getStateDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getUsersDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ITopReport>> getTopReportDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteFalla>> getGridDashBoard(Dictionary<string, object> parametros);
        #endregion DASHBOARD

        #region FORMALIZACION_VENTA
        Task<object> GetEncabezadoFormalizacionVenta(int idCliente);
        Task<object[]> GetDescuentosFormalizacionVenta(int idCliente);
        Task<object[]> GetCreditosFormalizacionVenta(int idCliente);
        Task<object[]> GetSubsidiosFormalizacionVenta(int idCliente);
        #endregion

        #region EQUIPAMIENTO_VENTA
        Task<object> GetEncabezadoEquipamientoVivienda(int idCliente);
        Task<object[]> GetDetalleEquipamientoVivienda(int idCliente);
        #endregion
    }
}