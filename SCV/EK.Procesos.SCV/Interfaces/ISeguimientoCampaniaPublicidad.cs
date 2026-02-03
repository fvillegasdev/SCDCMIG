using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("SeguimientoCampaniaPublicidad")]
    public interface ISeguimientoCampaniaPublicidad
     : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>
    {
        Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetEvents(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetLinks(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetLinkDetail(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetEventDetail(Dictionary<string, object> parametros);

    }
}