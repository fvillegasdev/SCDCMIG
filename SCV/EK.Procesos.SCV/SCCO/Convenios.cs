using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class Convenios
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IConvenio, d.SCCO.Interfaces.IConvenios>, p.SCCO.Interfaces.IConvenios
    {
        public Convenios(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IConvenios dao)
            : base(factory, dao, "scco_Convenios")
        {
        }
    }
}