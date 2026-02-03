using System;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("TipoFlujo")]
    public interface ITipoWorkflow
        : IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.ITipoWorkflow>
    {
    }
}
