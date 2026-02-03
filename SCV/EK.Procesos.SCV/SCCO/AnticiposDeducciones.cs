using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class AnticiposDeducciones
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IAnticiposDeducciones, d.SCCO.Interfaces.IAnticiposDeducciones>, p.SCCO.Interfaces.IAnticiposDeducciones
    {
        public AnticiposDeducciones(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IAnticiposDeducciones dao)
            : base(factory, dao, "scco_AnticiposDeducciones")
        {
        }
    }
}