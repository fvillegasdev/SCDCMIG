using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ReportesDictamenes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReporteDictamen>, d.SCV.Interfaces.IReportesDictamenes
    {
        private const string USP_SPV_REPORTE_DICTAMEN_SELECT = "usp_spv_reporte_dictamen_select";
        private const string USP_SPV_REPORT_DIAGNOSTICATE_SELECT = "usp_spv_reporte_dictamen_CAT_select";



        public ReportesDictamenes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_REPORTE_DICTAMEN_SELECT, null, "sv_reporte_dictamen")
        { }

        public async Task<List<m.SCV.Interfaces.IAgendaDictamenDetalle>> GetDictamenes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IAgendaDictamenDetalle>(
                    USP_SPV_REPORTE_DICTAMEN_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IDiagnosticosImagenesCAT>> GetDiagnosticateImageCAT(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IDiagnosticosImagenesCAT>(  USP_SPV_REPORT_DIAGNOSTICATE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IDiagnosticosNotaCAT>> GetDiagnosticateNoteCAT(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IDiagnosticosNotaCAT>(USP_SPV_REPORT_DIAGNOSTICATE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}