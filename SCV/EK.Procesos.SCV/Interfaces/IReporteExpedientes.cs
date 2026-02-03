using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("reporteexpedientes")]
    public interface IReporteExpedientes
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IReporteExpedientes>
    {
        Task<object> GetReporteExpedientes(Dictionary<string, object> parametros);


    }
}
