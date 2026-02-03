using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ClientesDesarrollo
        :d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IClienteDesarrollos>, d.SCV.Interfaces.IClienteDesarrollo

    {
        private const string USP_SCV_CLIENTES_DESARROLLOS_SELECT = "usp_scv_clientes_desarrollos_select";

        public ClientesDesarrollo(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_CLIENTES_DESARROLLOS_SELECT,
                  string.Empty,
                  "scv_clientes_Desarrollos")
        {

        }
    }
}
