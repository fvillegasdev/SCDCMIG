using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.MSSQL
{
   
    public class TipoProveedores
      : d.Kontrol.DAOBaseGeneric<m.SCP.Interfaces.ITipoProveedor>, d.SCP.Interfaces.ITipoProveedores
    {
        private const string USP_TIPOPROVEEDORES_SELECT = "usp_TipoProveedores_select";
        public TipoProveedores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_TIPOPROVEEDORES_SELECT, null, "TipoProveedores")
        { }
        
        public async Task<object> GetAllTipoProveedores(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TIPOPROVEEDORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}