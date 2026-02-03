using System;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("TiposEvento")]
    public interface ITiposEvento
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.ITipoEvento>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
