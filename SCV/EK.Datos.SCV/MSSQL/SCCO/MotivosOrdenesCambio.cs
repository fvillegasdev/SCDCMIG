using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.MSSQL
{
   
    public class MotivosOrdenesCambio
      : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IMotivosOrdenesCambio>, d.SCCO.Interfaces.IMotivosOrdenesCambio
    {
        private const string USP_SCCO = "usp_scco_MotivosOrdenesCambio_select";
        public MotivosOrdenesCambio(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO, null, "scco_MotivosOrdenesCambio")
        { }
        
        public async Task<object> GetAllMotivosOrdenesCambio(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCCO, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}