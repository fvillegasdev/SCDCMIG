using System.Threading.Tasks;
using System.Collections.Generic;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("OpcionSistema")]
    public interface IOpcionSistema
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IOpcion>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
