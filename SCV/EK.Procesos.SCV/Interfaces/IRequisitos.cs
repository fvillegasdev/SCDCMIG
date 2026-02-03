using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("requisitos")]
    public interface IRequisitos : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.SCV.Interfaces.IRequisitoCaracteristica>> GetCaracteristicas(Dictionary<string, object> parametros);
    }
}