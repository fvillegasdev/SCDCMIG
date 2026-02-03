using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class TiposEvento
        : BPBase<m.Kontrol.Interfaces.ITipoEvento, d.Kontrol.Interfaces.ITiposEvento>, p.Kontrol.Interfaces.ITiposEvento
    {
        public TiposEvento(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ITiposEvento dao)
            : base(factory, dao, "TiposEvento")
        {
        }
    }
}
