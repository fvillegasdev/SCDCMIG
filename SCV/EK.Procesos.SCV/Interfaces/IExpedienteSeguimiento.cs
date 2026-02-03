using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("expedienteSeguimiento")]
    public interface IExpedienteSeguimiento
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ITiposExpediente>
    {

        Task<object> AccionesExpediente(string clave);
    }
}