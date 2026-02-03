using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ComisionPlanEsquemaPeriodoDetalle :
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionPlanEsquemaPeriodoDetalle>, d.SCV.Interfaces.IComisionPlanEsquemaPeriodoDetalle
    {
        private const string USP_SCV_COMISION_SELECT = "usp_scv_Comision_PlanEsquema_Periodos_Detalles_select";

        public ComisionPlanEsquemaPeriodoDetalle(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_COMISION_SELECT, null, "scv_Comision_PlanEsquema_Periodos_Detalles")
        { }

        public  async Task<object> GetAllPlanEsquemaDetalle(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_COMISION_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
