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
    public class TipoFallaAreaComun
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITipoFallaAreaComun, d.SCV.Interfaces.ITipoFallaAreaComun>, p.SCV.Interfaces.ITipoFallaAreaComun

    {
        public TipoFallaAreaComun(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITipoFallaAreaComun dao)
            : base(factory, dao, "TipoFallaAreaComun")
        {
        }

    }
}