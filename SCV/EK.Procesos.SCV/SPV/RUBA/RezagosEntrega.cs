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
    public class RezagosEntrega
        : p.Kontrol.BPBase<m.SCV.Interfaces.IRezagosEntrega, d.SCV.Interfaces.IRezagosEntrega>, p.SCV.Interfaces.IRezagosEntrega

    {
        public RezagosEntrega(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IRezagosEntrega dao)
            : base(factory, dao, "RezagosEntrega")
        {
        }

    }
}