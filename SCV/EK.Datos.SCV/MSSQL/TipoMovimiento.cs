using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TipoMovimiento
        :d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITipoMovimiento>,d.SCV.Interfaces.ITipoMovimiento
    {
        private const string USP_TIPOMOVIMIENTO_SELECT= "usp_TipoMovimiento_select";

        public TipoMovimiento(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            :base(factory,helper,USP_TIPOMOVIMIENTO_SELECT,null, "scv_TipoMovimiento")
        { }

        public async Task<object> GetAllTipoMovimiento(Dictionary<string,object> parameters) {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TIPOMOVIMIENTO_SELECT,System.Data.CommandType.StoredProcedure,parameters);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
