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
   
    public class TipoObra
      : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.ITipoObra>, d.SCCO.Interfaces.ITipoObra
    {
        private const string USP_SCCO_TIPOOBRA_SELECT = "usp_scco_TipoObra_select";
        public TipoObra(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_TIPOOBRA_SELECT, null, "scco_TipoObra")
        { }
        
        public async Task<object> GetAllTipoObra(Dictionary<string, object> parameters)
        {

            try
            {
                //var p = new Dictionary<string, object>();
                //p.Add("activos",1);
                return await helper.CreateEntitiesAsync(USP_SCCO_TIPOOBRA_SELECT, CommandType.StoredProcedure, parameters);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}