using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("Insumos")]
    public interface IInsumos
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.IInsumo>
    {
    }
}
