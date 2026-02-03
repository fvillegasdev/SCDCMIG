using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Interfaces
{
    public interface ISeguimientoCampaniaPublicidad
      : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>
    {
        Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetEvents(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetLinks(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetLinkDetail(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetEventDetail(Dictionary<string, object> parametros);

    }
}