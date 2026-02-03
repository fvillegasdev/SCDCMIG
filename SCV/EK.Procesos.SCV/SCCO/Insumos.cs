using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class Insumos
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IInsumo, d.SCCO.Interfaces.IInsumos>, p.SCCO.Interfaces.IInsumos
    {
        public Insumos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IInsumos dao)
            : base(factory, dao, "scco_Insumo")
        {
        }
    }
}