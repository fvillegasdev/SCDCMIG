using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ClienteRefLaboral
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IClienteRefLaboral>, d.SCV.Interfaces.IClienteRefLaboral
    {
        private const string USP_SCV_CLIENTES_REFERENCIAS_SELECT = "usp_scv_clientes_ref_laborales_select";
        public ClienteRefLaboral(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_CLIENTES_REFERENCIAS_SELECT,
                  string.Empty,
                  "scv_clientes_ref_laborales")
        { }
    }
}
