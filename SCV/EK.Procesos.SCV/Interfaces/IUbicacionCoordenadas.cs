using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ubicacionCoordenadas")]
    public interface IUbicacionCoordenadas : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object[]> Save(IList<m.SCV.Interfaces.IUbicacionCoordenadas> elemento);
        Task<object[]> GetById(Dictionary<string, object> parametros);
    }
}
