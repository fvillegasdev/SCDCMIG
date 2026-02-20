using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ReportesFallasConsulta
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReporteFalla>, d.SCV.Interfaces.IReportesFallasConsulta
    {
        private const string USP_SPV_REPORTESFALLAS_CONSULTA_SELECT = "usp_spv_ReportesFallas_Consulta_select";
        private const string USP_SPV_CONSULTA_REINCIDENCIAS = "ups_consulta_reincidencias";
        private const string USP_SPV_CONSULTA_DATOSSEGA = "usp_spv_getDatosSega";
        private const string USP_SPV_CONSULTA_NOVIGENTES = "usp_spv_get_incidencias_novigentes";
        private const string USP_SPV_CONSULTA_INCIDENCIAENTREGA = "usp_spv_get_incidencias_entrega";
        private const string USP_SPV_CONSULTA_DIAGOTBYFOLIO = "usp_spv_get_diagostico_ot_byfolio";
        private const string USP_SPV_REPORTE_PREDICTIVO = "ups_Reporte_Predictivo";
        private const string SP_SPV_ANALISIS_COMPARATIVO_FIRMA_VIVIENDAV2 = "SP_SPV_ANALISIS_COMPARATIVO_FIRMA_VIVIENDAV2";
        private const string SP_SPV_ANALISIS_COMPARATIVO_ENTREGA_VIVIENDAV2 = "SP_SPV_ANALISIS_COMPARATIVO_ENTREGA_VIVIENDAV2";
        private const string SP_SPV_DIAS_PROMEDIO_ATENCION = "SP_SPV_DIAS_PROMEDIO_ATENCION";
        private const string SP_SPV_REPORTEAPP = "SP_SPV_REPORTEAPP";
        private const string SP_SPV_REPORTEFOLIOSVIVIENDA_SELECT = "usp_sv_reporte_foliosvivienda_select";
        private const string SP_SPV_CHECKLISTPENDIENTE_SELECT = "usp_sv_reporte_checklistpendiente_select";

        public ReportesFallasConsulta(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_REPORTESFALLAS_CONSULTA_SELECT, null, "sv_reporte")
        { }

        public async Task<object[]> GetConsulta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_REPORTESFALLAS_CONSULTA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConsultaReincidencias(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_CONSULTA_REINCIDENCIAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConsultaDatosSEGA(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_CONSULTA_DATOSSEGA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConsultaIncidenciasNoVigentes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_CONSULTA_NOVIGENTES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetConsultaIncidenciasEntrega(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_CONSULTA_INCIDENCIAENTREGA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetDiagOTByFolo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_CONSULTA_DIAGOTBYFOLIO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetReportePredictivo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_REPORTE_PREDICTIVO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetReporteComparativaIncidenciasFirmadas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    SP_SPV_ANALISIS_COMPARATIVO_FIRMA_VIVIENDAV2, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetReporteComparativaIncidenciasEntregadas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    SP_SPV_ANALISIS_COMPARATIVO_ENTREGA_VIVIENDAV2, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetConsultaDiasPromedioAtencion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    SP_SPV_DIAS_PROMEDIO_ATENCION, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetReporteAppEstadistico(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    SP_SPV_REPORTEAPP, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetReporteFoliosVivienda(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    SP_SPV_REPORTEFOLIOSVIVIENDA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConsultaChecklistPendiente(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    SP_SPV_CHECKLISTPENDIENTE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}