using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCP.MSSQL
{
    public class ProveedoresContactos
        : d.Kontrol.DAOBaseGeneric<m.SCP.Interfaces.IProveedorContactos>, d.SCP.Interfaces.IProveedorContacto

    {
        private const string USP_PROVEEDORES_CONTACTOS_SELECT = "usp_Proveedores_Contactos_select";

        public ProveedoresContactos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_PROVEEDORES_CONTACTOS_SELECT,
                  string.Empty,
                  "Proveedores_Contactos")
        {

        }

        public async Task<m.SCP.Interfaces.IProveedorContactos> ObtenerContactoPrincipal(int idProveedor,string claveContacto)
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"idProveedor",idProveedor },
                    {"claveTipoContacto",claveContacto },
                    {"titular",1 }
                };
                return await helper.CreateSingleEntityAsync<m.SCP.Interfaces.IProveedorContactos>(USP_PROVEEDORES_CONTACTOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
