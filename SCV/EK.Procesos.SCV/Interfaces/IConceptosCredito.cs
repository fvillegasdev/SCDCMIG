using System.Threading.Tasks;
using m = EK.Modelo.SCV.Interfaces;
using mk = EK.Modelo.Kontrol;
using pki = EK.Procesos.Kontrol.Interfaces;

using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [mk.KontrolName("conceptosCredito")]
    public interface IConceptosCredito : pki.IBaseProceso {
        Task<object> GetConceptosCredito(Dictionary<string, object> parametros);
    }
}
