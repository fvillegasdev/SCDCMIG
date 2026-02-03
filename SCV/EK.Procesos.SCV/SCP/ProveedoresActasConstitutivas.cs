using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCP
{
    public class ProveedoresActasConstitutivas
        : p.Kontrol.BPBase<m.SCP.Interfaces.IProveedorActaConstitutiva, d.SCP.Interfaces.IProveedoresActasConstitutivas>, p.SCP.Interfaces.IProveedoresActasConstitutivas
    {
        public ProveedoresActasConstitutivas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCP.Interfaces.IProveedoresActasConstitutivas dao)
            : base(factory, dao, "ProveedoresActasConstitutivas")
        {
        }
        
    }
}