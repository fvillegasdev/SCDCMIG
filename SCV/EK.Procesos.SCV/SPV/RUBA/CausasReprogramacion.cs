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
    public class CausasReprogramacion
        : p.Kontrol.BPBase<m.SCV.Interfaces.ICausasReprogramacion, d.SCV.Interfaces.ICausasReprogramacion>, p.SCV.Interfaces.ICausasReprogramacion

    {
        public CausasReprogramacion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ICausasReprogramacion dao)
            : base(factory, dao, "CausasReprogramacion")
        {
        }

    }
}