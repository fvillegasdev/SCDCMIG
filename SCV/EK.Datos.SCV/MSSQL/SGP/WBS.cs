using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using System.Data;

namespace EK.Datos.SGP.MSSQL
{
    public class WBS
     : d.Kontrol.DAOBaseGeneric<m.SGP.Interfaces.IWBS>,
        d.SGP.Interfaces.IWBS
    {
        private const string USP_WBS_SELECT = "usp_sgp_WBS_select";
        private const string USP_TREEVIEW_SELECT = "usp_sgp_TreeView_select";

        public WBS(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_WBS_SELECT, null, "sgp_wbs")
        { }

        public async Task<m.SGP.Interfaces.IWBS[]> GetTreeConfiguration(Dictionary<string, object> parameters)
        {
            List<m.SGP.Interfaces.IWBS> retValue = null;

            try
            {

                retValue =
                    await helper.CreateEntitiesAsync<m.SGP.Interfaces.IWBS>(USP_WBS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue.ToArray() : null;
        }

    }
}
