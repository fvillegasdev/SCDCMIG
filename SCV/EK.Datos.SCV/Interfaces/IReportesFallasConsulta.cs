using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReportesFallasConsulta
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IReporteFalla>
    {
        Task<object[]> GetConsulta(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaReincidencias(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaDatosSEGA(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaIncidenciasNoVigentes(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaIncidenciasEntrega(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaChecklistPendiente(Dictionary<string, object> parametros);
        Task<object[]> GetDiagOTByFolo(Dictionary<string, object> parametros);
        Task<object[]> GetReportePredictivo(Dictionary<string, object> parametros);
        Task<object[]> GetReporteComparativaIncidenciasFirmadas(Dictionary<string, object> parametros);
        Task<object[]> GetReporteComparativaIncidenciasEntregadas(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaDiasPromedioAtencion(Dictionary<string, object> parametros);
        Task<object[]> GetReporteAppEstadistico(Dictionary<string, object> parametros);
        Task<object[]> GetReporteFoliosVivienda(Dictionary<string, object> parametros);

    }
}