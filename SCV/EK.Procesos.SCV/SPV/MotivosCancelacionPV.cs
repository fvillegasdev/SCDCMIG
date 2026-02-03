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
    public class MotivosCancelacionPV
        : p.Kontrol.BPBase<m.SCV.Interfaces.IMotivosCancelacionPV, d.SCV.Interfaces.IMotivosCancelacionPV>, p.SCV.Interfaces.IMotivosCancelacionPV

    {
        public MotivosCancelacionPV(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IMotivosCancelacionPV dao)
            : base(factory, dao, "MotivosCancelacionPV")
        {
        }

    }
}