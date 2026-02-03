using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("SPVEncuestasSatisfaccionFija")]
    public interface ISPVEncuestasSatisfaccionFija
         : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ISPVEncuestaSatisfaccionFija>
    {
        Task<m.SCV.Interfaces.ISPVEncuestaSatisfaccionFija> GetIncuest(m.SCV.Interfaces.IReporteFalla item);
    }
}