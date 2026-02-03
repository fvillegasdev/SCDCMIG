using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface ICampaniaPublicidadListaMkt
     : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ICampaniaPublicidadListaMkt>
    {
        Task<m.SCV.Interfaces.ICampaniaPublicidadListaMkt> UpdateListasMarketingComplete(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.ICampaniaPublicidadListaMkt> UpdateStatusMktListlog(Dictionary<string, object> parametros);
    }
}