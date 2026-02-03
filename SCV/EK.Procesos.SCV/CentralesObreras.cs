using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class CentralesObreras
        : p.Kontrol.BPBase<m.SCV.Interfaces.ICentralObrera, d.SCV.Interfaces.ICentralesObreras>, p.SCV.Interfaces.ICentralesObreras
    {
        public CentralesObreras(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ICentralesObreras dao)
               : base(factory, dao, "centralesObreras")
        {
        }
    }
}
