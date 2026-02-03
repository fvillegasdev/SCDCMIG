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
    public class ConsultaReporteAreasComunes : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReporteFallasAreasComunes>, d.SCV.Interfaces.IReporteFallasAreasComunesConsulta
    {
        private const string USP_SPV_CONSULTA_REPORTE_FALLAS_AC = "usp_spv_Consulta_Reporte_Fallas_AC";

        public ConsultaReporteAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CONSULTA_REPORTE_FALLAS_AC, null, "sv_reporte_fallas_areas_comunes")
        { }

        public async Task<object[]> GetConsulta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_CONSULTA_REPORTE_FALLAS_AC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
