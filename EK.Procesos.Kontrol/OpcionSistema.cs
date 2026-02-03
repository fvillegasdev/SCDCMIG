using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class OpcionSistema
        : BPBase<m.Kontrol.Interfaces.IOpcion, d.Kontrol.Interfaces.IOpcionSistema>, p.Kontrol.Interfaces.IOpcionSistema
    {
        public OpcionSistema(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IOpcionSistema dao)
               : base(factory, dao, "opcionsistema")
        {
        }
    }
}
