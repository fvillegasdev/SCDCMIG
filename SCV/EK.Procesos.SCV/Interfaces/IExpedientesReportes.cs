using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("expedientesReportes")]
    public interface IExpedientesReportes
         : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IExpediente>
    {
        Task<object> GetReporteInformativoMacroEtapas(Dictionary<string, object> parametros);


    }
}