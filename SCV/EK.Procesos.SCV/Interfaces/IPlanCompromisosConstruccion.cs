using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("PlanCompromisosConstruccion")]
    public interface IPlanCompromisosConstruccion
          : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPlanCompromisosConstruccion>
    {
        Task<List<m.SCV.Interfaces.IPlanCompromisosConstruccion>> getGridDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IPlanCompromisoIndicador>> getDesarrolloDashBoard(Dictionary<string, object> parametros);
        //Task<List<m.SCV.Interfaces.ITopReport>> getTopIncidencias(Dictionary<string, object> parametros);
        //Task<List<m.SCV.Interfaces.ITopReport>> getTopContratistas(Dictionary<string, object> parametros);
        //Task<List<m.SCV.Interfaces.ITopReport>> getTopPrototipos(Dictionary<string, object> parametros);
        //Task<m.SCV.Interfaces.ITicketIncidenciaDetalle> CalcularPartida(m.SCV.Interfaces.ITicketIncidenciaDetalle partida, m.SCV.Interfaces.ITicket reporte);

        //Task<List<m.SCV.Interfaces.IOrdenTrabajoDetalle>> CalcularPartidasOT(int idTicket, int idContratista, m.SCV.Interfaces.IOrdenTrabajo orden, List<m.SCV.Interfaces.IOrdenTrabajo> ordenes);

        //Task<string> GetEncodedDocumentOT(int id);


    }
}