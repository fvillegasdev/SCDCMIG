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
   
    public class TipoNivelesPresupuesto
      : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.ITipoNivelesPresupuesto>, d.SCCO.Interfaces.ITipoNivelesPresupuesto
    {
        private const string USP_SCCO_TIPONIVELES_SELECT = "usp_scco_TipoNivelesPresupuesto_select";
        public TipoNivelesPresupuesto(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_TIPONIVELES_SELECT, null, "scco_TipoNivelesPresupuesto")
        { }
        
        public async Task<object> GetAllTipoNivelesPresupuesto(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCCO_TIPONIVELES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}