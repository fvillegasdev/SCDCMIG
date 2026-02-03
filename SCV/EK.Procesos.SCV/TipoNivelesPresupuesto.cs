using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class TipoNivelesPresupuesto
        : p.Kontrol.BPBase<m.SCCO.Interfaces.ITipoNivelesPresupuesto, d.SCCO.Interfaces.ITipoNivelesPresupuesto>, p.SCCO.Interfaces.ITipoNivelesPresupuesto
    {
        public TipoNivelesPresupuesto(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.ITipoNivelesPresupuesto dao)
            : base(factory, dao, "TipoNivelesPresupuesto")
        {
        }
        
    }
}