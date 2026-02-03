using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class PlanesPagoConceptosPago
        : dk.DAOBaseGeneric<m.IPlanPagosConceptoPago>, d.IPlanPagosConceptosPago
    {
        private const string ENTITY_NAME = "scv_Planes_Pagos_ConceptosPago";
        private const string USP_Planes_Pago_Conceptos_Pago_SELECT = "usp_scv_Planes_Pagos_ConceptosPago_select";

        public PlanesPagoConceptosPago(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_Planes_Pago_Conceptos_Pago_SELECT, null, ENTITY_NAME)
        { }
    }
}
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace EK.Datos.SCV.MSSQL
//{
//    class PlanesPagoConceptosPago
//    {
//    }
//}
