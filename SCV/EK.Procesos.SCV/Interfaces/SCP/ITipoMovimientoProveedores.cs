using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCP.Interfaces
{
    [m.Kontrol.KontrolName("TipoMovimientoProveedores")]

    public interface ITipoMovimientoProveedores
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCP.Interfaces.ITipoMovimientoProveedor>
    {}
}