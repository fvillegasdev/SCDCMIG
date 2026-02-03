using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ClientesContactos
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IClienteContactos>, d.SCV.Interfaces.IClienteContacto

    {
        private const string USP_SCV_CLIENTES_CONTACTOS_SELECT = "usp_scv_clientes_contactos_select";

        public ClientesContactos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_CLIENTES_CONTACTOS_SELECT,
                  string.Empty,
                  "scv_clientes_Contactos")
        {

        }

        public async Task<m.SCV.Interfaces.IClienteContactos> ObtenerContactoPrincipal(int idCliente,string claveContacto)
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"idCliente",idCliente },
                    {"claveTipoContacto",claveContacto },
                    {"titular",1 }
                };
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IClienteContactos>(USP_SCV_CLIENTES_CONTACTOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
