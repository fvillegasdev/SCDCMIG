using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class ReportesDictamenesAreasComunes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReporteAreasComunesDictamen>, d.SCV.Interfaces.IReportesDictamenesAreasComunes
    {
        private const string USP_SPV_REPORTE_DICTAMEN_SELECT = "usp_spv_reporte_dictamen_area_comun_select";
        private const string USP_SPV_REPORT_DIAGNOSTICATE_SELECT = "usp_spv_reporte_dictamen_CAT_select";

        public ReportesDictamenesAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_REPORTE_DICTAMEN_SELECT, null, "sv_reporte_areas_comunes_dictamen")
        { }

        public Task<List<IDiagnosticosImagenesCAT>> GetDiagnosticateImageCAT(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public Task<List<IDiagnosticosNotaCAT>> GetDiagnosticateNoteCAT(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public async Task<List<IAgendaDictamenDetalleAreasComunes>> GetDictamenes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IAgendaDictamenDetalleAreasComunes>(
                    USP_SPV_REPORTE_DICTAMEN_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
