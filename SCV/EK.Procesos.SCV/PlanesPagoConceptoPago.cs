using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EK.Procesos.SCV
{
    public class PlanesPagoConceptoPago
        : p.Kontrol.BPBase<m.SCV.Interfaces.IPlanPagosConceptoPago, d.SCV.Interfaces.IPlanPagosConceptosPago>, p.SCV.Interfaces.IPlanesPagoConceptosPagos
    {
        public PlanesPagoConceptoPago(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IPlanPagosConceptosPago dao)
            : base(factory, dao, "PlanesPagoConceptosPagos")
        {
        }

    }
}
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace EK.Procesos.SCV
//{
//    class PlanesPagoConceptoPago
//    {
//    }
//}
