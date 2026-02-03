using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ExpedientesReportes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IExpediente>, d.SCV.Interfaces.IExpedientesReportes
    {

        private const string USP_SCV_REPORTE_INFORMATIVO_MACROETAPAS_SELECT = "usp_scv_ReporteInformativoMacroEtapas";
        private const string USP_SCV_REPORTE_FUERZA_VENTAS_SELECT = "usp_scv_ReporteFuerzaVentas";

        private const string USP_SCV_REPORTE_FORECAST_SELECT = "usp_scv_Forecast";


        private const string USP_SCV_Year_EjecucionProcesos_SELECT = "usp_scv_Expedientes_Year_EjecucionProcesos_select";

        private const string USP_SCV_REPORTE_EXPEDIENTES_CANCELADOS_SUSPE_SELECT = "usp_scv_ReporteExpedientes_Cancelados_Suspendidos_select";


        private const string USP_SCV_REPORTE_ANALISIS_EXPEDIENTE_PORETAPA_SELECT = "usp_scv_Reporte_Analisis_de_Expediente_PorEtapa_select";


        private const string USP_SCV_ETAPAS_POR_PROCESO_SELECT = "usp_SCV_Etapas_RelacionadasProcesos_select";

        public ExpedientesReportes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, "", string.Empty, string.Empty)
        { }


        public async Task<object> GetReporteInformativoMacroEtapas(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync(USP_SCV_REPORTE_INFORMATIVO_MACROETAPAS_SELECT, CommandType.StoredProcedure, parametros);
        }

        public async Task<object> GetReporteFuerzaVentas(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync(USP_SCV_REPORTE_FUERZA_VENTAS_SELECT, CommandType.StoredProcedure, parametros);
        }

        public async Task<object> GetReporteForecast(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync(USP_SCV_REPORTE_FORECAST_SELECT, CommandType.StoredProcedure, parametros);
        }


        /*Este metodo sirve para obtener los años distintos que existen en los cuales se ha realizado
         una ejecucion de proceso*/

        public async Task<object> GetYearEjecucionProcesos(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync(USP_SCV_Year_EjecucionProcesos_SELECT, CommandType.StoredProcedure, parametros);
        }


        /*Reporte de Expedientes cancelados o suspendidos*/

        public async Task<object> GetExpedientesCanceladosSuspendidos(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync(USP_SCV_REPORTE_EXPEDIENTES_CANCELADOS_SUSPE_SELECT, CommandType.StoredProcedure, parametros);
        }


        /*Reporte de analisis de expediente por etapa*/

        public async Task<object> GetReporteAnalisisExpedientesPorEtapa(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_REPORTE_ANALISIS_EXPEDIENTE_PORETAPA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch(Exception ex)
            {
                throw;

            }
        }

        public async Task<object> GetEtapasPorProceso(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync(USP_SCV_ETAPAS_POR_PROCESO_SELECT, CommandType.StoredProcedure, parametros);
        }


    }
}
