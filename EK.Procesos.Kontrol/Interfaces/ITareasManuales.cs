using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("tareasManuales")]
    public interface ITareasManuales
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.ITareaManual>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
