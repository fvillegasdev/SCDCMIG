using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.MSSQL
{
   
    public class ProveedoresActasConstitutivas
      : d.Kontrol.DAOBaseGeneric<m.SCP.Interfaces.IProveedorActaConstitutiva>, d.SCP.Interfaces.IProveedoresActasConstitutivas
    {
        private const string USP_PROVEEDORES_ACTASCONSTITUTIVAS_SELECT = "usp_Proveedores_ActasConstitutivas_select";
        public ProveedoresActasConstitutivas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PROVEEDORES_ACTASCONSTITUTIVAS_SELECT, null, "Proveedores_ActasConstitutivas")
        { }
        
        public async Task<object> GetAllProveedoresActasConstitutivas(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_PROVEEDORES_ACTASCONSTITUTIVAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}