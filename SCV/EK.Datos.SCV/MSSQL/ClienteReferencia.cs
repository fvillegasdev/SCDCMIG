using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ClienteReferencia
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IClienteReferencia>, d.SCV.Interfaces.IClienteReferencia
    {
        private const string USP_SCV_CLIENTES_REFERENCIAS_SELECT = "usp_scv_clientes_referencias_select";
        public ClienteReferencia(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_CLIENTES_REFERENCIAS_SELECT,
                  string.Empty,
                  "scv_clientes_refPersonales")
                { }
    }
}
