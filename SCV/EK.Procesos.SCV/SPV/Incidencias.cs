using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace EK.Procesos.SCV
{
    public class Incidencias : p.Kontrol.BPBase<m.SCV.Interfaces.IIncidencia, d.SCV.Interfaces.IIncidencias>, p.SCV.Interfaces.IIncidencias
    {
        public Incidencias(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IIncidencias dao)
            : base(factory, dao, "Fallas")
        {
        }

    }

}