using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("Asentamientos")]
    public interface IAsentamientos
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IAsentamiento>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
