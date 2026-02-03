using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class NivelesPresupuesto
        : p.Kontrol.BPBase<m.SCCO.Interfaces.INivelPresupuesto, d.SCCO.Interfaces.INivelesPresupuesto>, p.SCCO.Interfaces.INivelesPresupuesto
    {
        public NivelesPresupuesto(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.INivelesPresupuesto dao)
            : base(factory, dao, "NivelesPresupuesto")
        {
        }
        
    }
}