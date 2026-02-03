using System;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("TiposEntidad")]
    public interface ITiposEntidad
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.ITipoEntidad>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
