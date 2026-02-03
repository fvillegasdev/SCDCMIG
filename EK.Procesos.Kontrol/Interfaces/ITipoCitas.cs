using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("TipoCitas")]
    public interface ITipoCitas
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.ITipoCitas>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
