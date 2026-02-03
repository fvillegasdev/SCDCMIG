using System.Collections.Generic;
using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPlanesPagosConfiguracion
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPlanPagosConfiguracion>
    {
    }
}
