using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCP.Interfaces
{
    [m.Kontrol.KontrolName("RegistroPublicoPropiedad")]

    public interface IProveedoresRegistroPublicoPropiedad
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCP.Interfaces.IProveedorRegistroPublicoPropiedad>
    {}
}