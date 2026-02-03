using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IExpedientesReportes
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IExpediente>
    {
        Task<object> GetReporteInformativoMacroEtapas(Dictionary<string, object> parametros);


        Task<object> GetReporteFuerzaVentas(Dictionary<string, object> parametros);
        Task<object> GetReporteForecast(Dictionary<string, object> parametros);

        Task<object> GetYearEjecucionProcesos(Dictionary<string, object> parametros);

        Task<object> GetExpedientesCanceladosSuspendidos(Dictionary<string, object> parametros);

        Task<object> GetEtapasPorProceso(Dictionary<string, object> parametros);


        Task<object> GetReporteAnalisisExpedientesPorEtapa(Dictionary<string, object> parametros);

    }
}
