using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("Contratos")]
    public interface IContratos
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.IContrato>
    {
      

    }
}