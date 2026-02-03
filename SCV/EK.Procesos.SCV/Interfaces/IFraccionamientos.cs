using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Fraccionamientos")]
    public interface IFraccionamientos
        : m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IFraccionamientos>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object> GetGeoJson(Dictionary<string, object> parametros);
    }
}