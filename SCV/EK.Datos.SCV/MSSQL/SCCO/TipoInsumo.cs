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
    public class TipoInsumo
      : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.ITipoInsumo>, d.SCCO.Interfaces.ITipoInsumo
    {
        private const string USP_SCCO_TIPO_INSUMOS_SELECT = "usp_scco_Tipo_Insumos_select";
        public TipoInsumo(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_TIPO_INSUMOS_SELECT, null, "scco_Tipo_Insumos")
        { }
        
        public async Task<object> GetAllTipoInsumo(Dictionary<string,object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCCO_TIPO_INSUMOS_SELECT,CommandType.StoredProcedure,parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}