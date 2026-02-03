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
    public class VocacionesSPV
        : p.Kontrol.BPBase<m.SCV.Interfaces.IVocacionSPV, d.SCV.Interfaces.IVocacionesSPV>, p.SCV.Interfaces.IVocacionesSPV

    {
        public VocacionesSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IVocacionesSPV dao)
            : base(factory, dao, "vocacionesSPV")
        {
        }

    }
}