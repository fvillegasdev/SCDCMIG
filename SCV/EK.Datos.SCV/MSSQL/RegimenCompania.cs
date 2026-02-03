using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class RegimenCompania
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IRegimenCompania>, d.SCV.Interfaces.IRegimenCompania
    {
        private const string USP_SCV_REGIMENCOMPANIA_SELECT = "usp_scv_regimencompania_select";

        public RegimenCompania(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_REGIMENCOMPANIA_SELECT, null, "scv_RegimenCompania")
        { }


        public async Task<object[]> GetAllRegimenCompania(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_REGIMENCOMPANIA_SELECT, CommandType.StoredProcedure,parametros);
            }
            catch (Exception)
            {

                throw;
            }
        }
        
    }
}
