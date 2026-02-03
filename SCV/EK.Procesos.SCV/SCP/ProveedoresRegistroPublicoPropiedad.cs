using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCP
{
    public class ProveedoresRegistroPublicoPropiedad
        : p.Kontrol.BPBase<m.SCP.Interfaces.IProveedorRegistroPublicoPropiedad, d.SCP.Interfaces.IProveedoresRegistroPublicoPropiedad>, p.SCP.Interfaces.IProveedoresRegistroPublicoPropiedad
    {
        public ProveedoresRegistroPublicoPropiedad(m.Kontrol.Interfaces.IContainerFactory factory, d.SCP.Interfaces.IProveedoresRegistroPublicoPropiedad dao)
            : base(factory, dao, "RegistroPublicoPropiedad")
        {
        }
        
    }
}