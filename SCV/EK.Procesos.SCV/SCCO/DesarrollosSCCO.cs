using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class DesarrollosSCCO
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IDesarrolloSCCO, d.SCCO.Interfaces.IDesarrollosSCCO>, p.SCCO.Interfaces.IDesarrollosSCCO
    {
        public DesarrollosSCCO(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IDesarrollosSCCO dao)
            : base(factory, dao, "Desarrollos")
        {
        }
    }
}