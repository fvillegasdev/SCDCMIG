using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class MotivosOrdenesCambio
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IMotivosOrdenesCambio, d.SCCO.Interfaces.IMotivosOrdenesCambio>, p.SCCO.Interfaces.IMotivosOrdenesCambio
    {
        public MotivosOrdenesCambio(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IMotivosOrdenesCambio dao)
            : base(factory, dao, "MotivosOrdenesCambio")
        {
        }
        
    }
}