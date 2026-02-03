using System.Threading.Tasks;
using m = EK.Modelo;

using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    public interface ICalculoProcesosMetodos:p.Kontrol.Interfaces.IBaseProceso
    {
        Task DoAvanceFase(m.SCV.Interfaces.ISeguimientoProceso item);
        Task DoCierreVenta(m.SCV.Interfaces.ISeguimientoProceso item);
        Task DoSendEmail(m.SCV.Interfaces.ISeguimientoProceso item);
        Task DoSendSMS(m.SCV.Interfaces.ISeguimientoProceso item);
        Task DoFiniquito(m.SCV.Interfaces.ISeguimientoProceso item);
        Task DoAvanceEtapa(m.SCV.Interfaces.ISeguimientoProceso item);
        Task DoDefault(m.SCV.Interfaces.ISeguimientoProceso item);
        Task DoAsignacionEstatus(m.SCV.Interfaces.ISeguimientoProceso item);
    }
}