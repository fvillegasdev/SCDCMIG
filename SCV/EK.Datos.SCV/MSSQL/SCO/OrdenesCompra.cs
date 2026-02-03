using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCO.MSSQL
{
    public class OrdenesCompra
        : d.Kontrol.DAOBaseGeneric<m.SCO.Interfaces.IOrdenesCompra>, d.SCO.Interfaces.IOrdenesCompra

    {
        private const string USP_SCO_ORDENESCOMPRA_SELECT = "usp_sco_OrdenesCompra_select";

        public OrdenesCompra(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCO_ORDENESCOMPRA_SELECT,
                  string.Empty,
                  "SCO_OrdenesCompra")
        {

        }
    }
}
