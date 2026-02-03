using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("CampaniasPublicidad")]
    public interface ICampaniaPublicidad 
     : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ICampaniaPublicidad>
    {
        Task<List<m.SCV.Interfaces.ICampaniaPublicidadListaMkt>> GetListasMarketing(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.ICampaniaPublicidadListaMkt> UpdateListasMarketingComplete(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.ICampaniaPublicidadListaMkt> UpdateStatusMktListlog(Dictionary<string, object> parametros);
        
        //Campaña Publicidad por Usuario QUICKSIDEBAR
        Task<List<m.SCV.Interfaces.ICampaniaPublicidad>> SelectCampaniaPublicidadUser(Dictionary<string, object> parametros);

    }
}