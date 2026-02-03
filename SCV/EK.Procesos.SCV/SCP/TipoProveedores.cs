using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCP
{
    public class TipoProveedores
        : p.Kontrol.BPBase<m.SCP.Interfaces.ITipoProveedor, d.SCP.Interfaces.ITipoProveedores>, p.SCP.Interfaces.ITipoProveedores
    {
        public TipoProveedores(m.Kontrol.Interfaces.IContainerFactory factory, d.SCP.Interfaces.ITipoProveedores dao)
            : base(factory, dao, "TipoProveedores")
        {
        }
        
    }
}