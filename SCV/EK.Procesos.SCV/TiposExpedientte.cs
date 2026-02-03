using System;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class TiposExpediente
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITiposExpediente, d.SCV.Interfaces.ITiposExpediente>, p.SCV.Interfaces.ITiposExpediente
    {
        public TiposExpediente(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITiposExpediente dao)
            : base(factory, dao, "TiposExpediente")
        {
        }
    }
}
