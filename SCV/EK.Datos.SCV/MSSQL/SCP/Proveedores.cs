using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.MSSQL
{
   
    public class Proveedores
      : d.Kontrol.DAOBaseGeneric<m.SCP.Interfaces.IProveedor>, d.SCP.Interfaces.IProveedores
    {
        private const string USP_PROVEEDORES_SELECT = "usp_proveedores_select";
        private const string USP_PROVEEDORES_ACTASCONSTITUTIVAS_SELECT = "usp_Proveedores_ActasConstitutivas_select";
        public Proveedores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PROVEEDORES_SELECT, null, "Proveedores")
        { }
        
        public async Task<object> GetAllProveedores(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_PROVEEDORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCP.Interfaces.IProveedorActaConstitutiva>> GetProveedorActasConstitutivas(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idProveedor", id }
                };

                return await helper.CreateEntitiesAsync<m.SCP.Interfaces.IProveedorActaConstitutiva>(USP_PROVEEDORES_ACTASCONSTITUTIVAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

    }
}