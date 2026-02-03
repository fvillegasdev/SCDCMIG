using System.Collections.Generic;
using System.Threading.Tasks;
//
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("SCVReportes")]
    public interface IReportes
        : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object[]> GetMonitoreoAgentes(Dictionary<string, object> parametros);
    }
}