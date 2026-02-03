using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.MSSQL
{
   
    public class TipoMovimientoProveedores
      : d.Kontrol.DAOBaseGeneric<m.SCP.Interfaces.ITipoMovimientoProveedor>, d.SCP.Interfaces.ITipoMovimientoProveedores
    {
        private const string USP_TIPOMOVIMIENTOPROVEEDORES_SELECT = "usp_TipoMovimientoProveedores_select";
        public TipoMovimientoProveedores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_TIPOMOVIMIENTOPROVEEDORES_SELECT, null, "TipoMovimientoProveedores")
        { }
        
        public async Task<object> GetAllTipoMovimientoProveedores(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TIPOMOVIMIENTOPROVEEDORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}