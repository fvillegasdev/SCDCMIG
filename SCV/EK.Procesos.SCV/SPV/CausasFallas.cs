using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class CausasFallas
        : p.Kontrol.BPBase<m.SCV.Interfaces.ICausaFalla, d.SCV.Interfaces.ICausasFallas>, p.SCV.Interfaces.ICausasFallas
    {
        public CausasFallas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ICausasFallas dao)
            : base(factory, dao, "sv_causas_falla")
        {
        }
    }
}