using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using p = EK.Procesos;
using m = EK.Modelo;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("PlanesPagosConfiguracion")]
    public interface IPlanesPagosConfiguracion
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPlanPagosConfiguracion>
    {
    }
}
