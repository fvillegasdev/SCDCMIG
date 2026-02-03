using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Componentes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IComponente, d.SCV.Interfaces.IComponentes>, p.SCV.Interfaces.IComponentes
    {
        public Componentes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IComponentes dao)
            : base(factory, dao, "spv_equivalencias_familias")
        {
        }
    }
}