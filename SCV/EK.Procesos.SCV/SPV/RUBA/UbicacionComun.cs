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
    public class UbicacionComun
        : p.Kontrol.BPBase<m.SCV.Interfaces.IUbicacionComun, d.SCV.Interfaces.IUbicacionComun>, p.SCV.Interfaces.IUbicacionComun

    {
        public UbicacionComun(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IUbicacionComun dao)
            : base(factory, dao, "UbicacionComun")
        {
        }

    }
}