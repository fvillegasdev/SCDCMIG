using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCP
{
    public class TipoMovimientoProveedores
        : p.Kontrol.BPBase<m.SCP.Interfaces.ITipoMovimientoProveedor, d.SCP.Interfaces.ITipoMovimientoProveedores>, p.SCP.Interfaces.ITipoMovimientoProveedores
    {
        public TipoMovimientoProveedores(m.Kontrol.Interfaces.IContainerFactory factory, d.SCP.Interfaces.ITipoMovimientoProveedores dao)
            : base(factory, dao, "TipoMovimientoProveedores")
        {
        }
        
    }
}