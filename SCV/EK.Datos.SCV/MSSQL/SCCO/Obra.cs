using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class Obra : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IObra>, d.SCCO.Interfaces.IObra
    {
        private const string USP_SCCO_TIPOOBRA_SELECT = "usp_scco_Obra_select";
        public Obra(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_TIPOOBRA_SELECT, null, "scco_Obra")
        { }

        public async Task<object> GetAllObra(Dictionary<string,object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCCO_TIPOOBRA_SELECT,System.Data.CommandType.StoredProcedure,parameters);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
