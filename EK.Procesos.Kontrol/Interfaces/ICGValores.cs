using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("CGValores")]
    public interface ICGValores
        : p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
