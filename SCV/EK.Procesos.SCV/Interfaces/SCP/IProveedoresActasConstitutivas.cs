using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCP.Interfaces
{
    [m.Kontrol.KontrolName("ActaConstitutiva")]

    public interface IProveedoresActasConstitutivas
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCP.Interfaces.IProveedorActaConstitutiva>
    {}
}