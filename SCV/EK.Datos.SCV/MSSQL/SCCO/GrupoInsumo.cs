using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class GrupoInsumo : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IGrupoInsumo>, d.SCCO.Interfaces.IGrupoInsumo
    {
        private const string USP_SCCO_GRUPOINSUMO_SELECT = "usp_scco_GrupoInsumo_select";
        public GrupoInsumo(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_GRUPOINSUMO_SELECT, null, "scco_GrupoInsumo")
        { }

        public async Task<object> GetAllGrupoInsumo(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCCO_GRUPOINSUMO_SELECT,CommandType.StoredProcedure,parameters);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
