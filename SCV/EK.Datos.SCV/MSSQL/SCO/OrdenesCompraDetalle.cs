using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCO.MSSQL
{
    public class OrdenesCompraDetalle
        : d.Kontrol.DAOBaseGeneric<m.SCO.Interfaces.IOrdenesCompraDetalle>, d.SCO.Interfaces.IOrdenesCompraDetalle

    {
        private const string USP_SCO_ORDENESCOMPRA_DETALLE_SELECT = "usp_sco_OrdenesCompraDetalle_select";

        public OrdenesCompraDetalle(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCO_ORDENESCOMPRA_DETALLE_SELECT,
                  string.Empty,
                  "SCO_OrdenesCompraDetalle")
        {

        }
    }
}
