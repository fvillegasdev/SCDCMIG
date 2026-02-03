using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class TiposEntidad
        : BPBase<m.Kontrol.Interfaces.ITipoEntidad, d.Kontrol.Interfaces.ITiposEntidad>, p.Kontrol.Interfaces.ITiposEntidad
    {
        public TiposEntidad(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ITiposEntidad dao)
            : base(factory, dao, "TiposEntidad")
        {
        }
    }
}
