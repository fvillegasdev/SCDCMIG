using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class TiposDeProcesos
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITiposDeProceso, d.SCV.Interfaces.ITiposDeProcesos>, p.SCV.Interfaces.ITiposDeProcesos
    {
        public TiposDeProcesos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITiposDeProcesos dao)
            : base(factory, dao, "TiposDeProcesos")
        {
        }

    }
}