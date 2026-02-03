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
    public class Procesos
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IProceso>,d.SCV.Interfaces.IProcesos
    {
        private const string USP_SCV_PROCESOS_SELECT = "usp_scv_Procesos_select";

        public Procesos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base (factory,helper, USP_SCV_PROCESOS_SELECT, null, "scv_Procesos") { }

        public async Task<object> GetAllProcesos(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}