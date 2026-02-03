using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class TipoContratista
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITipoContratista, d.SCV.Interfaces.ITipoContratista>, p.SCV.Interfaces.ITipoContratista

    {
        public TipoContratista(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITipoContratista dao)
            : base(factory, dao, "TipoContratista")
        {
        }

    }
}