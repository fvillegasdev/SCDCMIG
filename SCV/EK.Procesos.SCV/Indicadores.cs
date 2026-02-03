using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Indicadores
        : p.Kontrol.BPBase<m.SCV.Interfaces.IIndicadores, d.SCV.Interfaces.IIndicadores>, p.SCV.Interfaces.IIndicadores
    {
        public Indicadores(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IIndicadores dao)
            : base(factory, dao, "indicadores")
        {

        }
    }
}
