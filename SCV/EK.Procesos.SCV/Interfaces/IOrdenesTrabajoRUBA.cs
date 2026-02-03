using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("OrdenesTrabajoRUBA")]
    public interface IOrdenesTrabajoRUBA :
        p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IOrdenTrabajoRUBA>
    {
    }
}