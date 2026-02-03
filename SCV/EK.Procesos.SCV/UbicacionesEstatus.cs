using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class UbicacionesEstatus
        : p.Kontrol.BPBase<m.SCV.Interfaces.IUbicacionEstatus, d.SCV.Interfaces.IUbicacionesEstatus>,
        p.SCV.Interfaces.IUbicacionesEstatus
    {
        public UbicacionesEstatus(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IUbicacionesEstatus dao)
               : base(factory, dao, "ubicacionEstatus")
        {
        }

    }
}
