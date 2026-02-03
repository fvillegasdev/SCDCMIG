using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("monedas")]
    public interface IMonedas
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IMoneda>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
