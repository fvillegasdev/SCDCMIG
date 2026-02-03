using System;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("Eventos")]
    public interface IEventos
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IEvento>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
