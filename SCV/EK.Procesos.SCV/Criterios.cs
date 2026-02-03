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
    public class Criterios
    : p.Kontrol.BPBase<m.SCV.Interfaces.ICriterios, d.SCV.Interfaces.ICriterios>,
    p.SCV.Interfaces.ICriterios
    {
    public Criterios(m.Kontrol.Interfaces.IContainerFactory factory,
      d.SCV.Interfaces.ICriterios dao)
      : base(factory, dao, "scv_criterios")
        {
        }
    }
}
