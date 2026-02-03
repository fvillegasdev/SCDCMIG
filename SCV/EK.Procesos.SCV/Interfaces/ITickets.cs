using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Tickets")]
    public interface ITickets
          : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ITicket>
    {
        Task<List<m.SCV.Interfaces.ITicket>> getGridDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getUsersDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ITopReport>> getTopIncidencias(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ITopReport>> getTopContratistas(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ITopReport>> getTopPrototipos(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.ITicketIncidenciaDetalle> CalcularPartida(m.SCV.Interfaces.ITicketIncidenciaDetalle partida, m.SCV.Interfaces.ITicket reporte);

        Task<List<m.SCV.Interfaces.IOrdenTrabajoDetalle>> CalcularPartidasOT(int idTicket, int idContratista, m.SCV.Interfaces.IOrdenTrabajo orden, List<m.SCV.Interfaces.IOrdenTrabajo> ordenes);

        Task<string> GetEncodedDocumentOT(int id);


    }
}