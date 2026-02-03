using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCO.MSSQL
{
    public class OrdenesCompraImpuesto
        : d.Kontrol.DAOBaseGeneric<m.SCO.Interfaces.IOrdenesCompraImpuesto>, d.SCO.Interfaces.IOrdenesCompraImpuesto

    {
        private const string USP_SCO_ORDENESCOMPRA_IMPUESTO_SELECT = "usp_sco_OrdenesCompraImpuestos_select";

        public OrdenesCompraImpuesto(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCO_ORDENESCOMPRA_IMPUESTO_SELECT,
                  string.Empty,
                  "SCO_OrdenesCompraDetalle")
        {

        }
    }
}
