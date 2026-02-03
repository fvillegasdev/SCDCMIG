using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Asentamientos
        : BPBase<m.Kontrol.Interfaces.IAsentamiento, d.Kontrol.Interfaces.IAsentamientos>, p.Kontrol.Interfaces.IAsentamientos
    {
        public Asentamientos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IAsentamientos dao)
               : base(factory, dao, "asentamientos")
        {
        }
    }
}
