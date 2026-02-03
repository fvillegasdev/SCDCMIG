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
    public class HorarioAtencion
        : p.Kontrol.BPBase<m.SCV.Interfaces.IHorarioAtencion, d.SCV.Interfaces.IHorarioAtencion>, p.SCV.Interfaces.IHorarioAtencion

    {
        public HorarioAtencion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IHorarioAtencion dao)
            : base(factory, dao, "spv_horarios_atencion")
        {
        }

    }
}