using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class TipoCitas
        : BPBase<m.Kontrol.Interfaces.ITipoCitas, d.Kontrol.Interfaces.ITipoCitas>, p.Kontrol.Interfaces.ITipoCitas
    {
        public TipoCitas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ITipoCitas dao)
               : base(factory, dao, "tipoCitas")
        {
        }
    }
}

