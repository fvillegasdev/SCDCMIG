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
    public class TiposComponentes
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITipoComponente, d.SCV.Interfaces.ITiposComponentes>, p.SCV.Interfaces.ITiposComponentes

    {
        public TiposComponentes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITiposComponentes dao)
            : base(factory, dao, "TiposComponentes")
        {
        }

    }
}