using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Procesos.SCV
{
    public class UbicacionesFallaPrototipos
        : p.Kontrol.BPBase
        <m.SCV.Interfaces.IUbicacionFallaPrototipo,
        d.SCV.Interfaces.IUbicacionesFallaPrototipos>,
        p.SCV.Interfaces.IUbicacionesFallaPrototipos
    {
        public UbicacionesFallaPrototipos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IUbicacionesFallaPrototipos dao)
            : base(factory, dao, "UbicacionesFallaPrototipos")
        {
        }

      


    }
}
