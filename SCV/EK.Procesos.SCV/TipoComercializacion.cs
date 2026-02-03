using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class TipoComercializacion
          : p.Kontrol.BPBase<m.SCV.Interfaces.ITipoComercializacion, d.SCV.Interfaces.ITipoComercializacion>,
        p.SCV.Interfaces.ITipoComercializacion
    {
        public TipoComercializacion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITipoComercializacion dao)
            : base(factory, dao, "tipoComercializacion")
        {
        }
    }
}