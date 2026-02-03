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
    public class UbicacionesFalla
        : p.Kontrol.BPBase<m.SCV.Interfaces.IUbicacionesFalla, d.SCV.Interfaces.IUbicacionesFalla>, p.SCV.Interfaces.IUbicacionesFalla

    {
        public UbicacionesFalla(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IUbicacionesFalla dao)
            : base(factory, dao, "UbicacionesFalla")
        {
        }

    }
}