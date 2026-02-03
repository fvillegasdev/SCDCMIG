using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("SCCODesarrollos")]

    public interface IDesarrollosSCCO
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.IDesarrolloSCCO>
    { }
}