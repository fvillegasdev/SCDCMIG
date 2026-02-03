using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Regimen
        :d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IRegimen>,d.SCV.Interfaces.IRegimen
    {
        private const string USP_SCV_REGIMEN_SELECT = "usp_scv_Regimen_select";

        public Regimen(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory,helper,USP_SCV_REGIMEN_SELECT,null, "scv_Regimen")
        {

        }

        public async Task<object> GetAllRegimen(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_REGIMEN_SELECT,System.Data.CommandType.StoredProcedure,parameters);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
