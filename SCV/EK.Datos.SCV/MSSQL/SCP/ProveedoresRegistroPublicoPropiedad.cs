using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.MSSQL
{
   
    public class ProveedoresRegistroPublicoPropiedad
      : d.Kontrol.DAOBaseGeneric<m.SCP.Interfaces.IProveedorRegistroPublicoPropiedad>, d.SCP.Interfaces.IProveedoresRegistroPublicoPropiedad
    {
        private const string USP_PROVEEDORES_REGISTROPUBLICOPROPIEDAD_SELECT = "usp_Proveedores_RegistroPublicoPropiedad_select";
        public ProveedoresRegistroPublicoPropiedad(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PROVEEDORES_REGISTROPUBLICOPROPIEDAD_SELECT, null, "Proveedores_RegistroPublicoPropiedad")
        { }
        
        public async Task<object> GetAllProveedoresRegistroPublicoPropiedad(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_PROVEEDORES_REGISTROPUBLICOPROPIEDAD_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}