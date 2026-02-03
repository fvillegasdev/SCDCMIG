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
    public class OrigenFalla
        : p.Kontrol.BPBase<m.SCV.Interfaces.IOrigenFalla, d.SCV.Interfaces.IOrigenFalla>, p.SCV.Interfaces.IOrigenFalla

    {
        public OrigenFalla(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IOrigenFalla dao)
            : base(factory, dao, "OrigenFalla")
        {
        }

    }
}