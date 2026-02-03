using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using miSCV = EK.Modelo.SCV.Interfaces;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("PlanesPagoConceptosPagos")]
    public interface IPlanesPagoConceptosPagos
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPlanPagosConceptoPago>
    {
    }
}
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace EK.Procesos.SCV.Interfaces
//{
//    class IPlanesPagoConceptosPagos
//    {
//    }
//}

