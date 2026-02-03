using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IAgendaSPV
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IAgendaSPV>
    {
        Task<List<m.SCV.Interfaces.IAgendaContratistaDetalle>> GetAgendaDetalleCitaContratista(int IdAgenda, int IdAgendaDetalle);
        Task<int> SaveDetProg(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.IModificarAgenda> SaveCambioAgenda(Dictionary<string, object> parametros);
        Task<int> GetPeriodoDetalleDisponible(Dictionary<string, object> parametros);
        Task<int> CerrarReservas(Dictionary<string, object> parametros);
        Task<int> GetCuantasReprogramaciones(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgenda>> GetAgendaDetalleHistorial(string tipoAgenda, int idExpediente, string estatusAgenda);
        Task<object> GetUsuariosEmailCat(Dictionary<string, object> parametros);
        Task<object> GetPlazasEmailCC(Dictionary<string, object> parametros);
        Task<int> updateEntityId(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>> GetAgendaDetalleCitaContratistaAreasComunes(int IdAgenda, int IdAgendaDetalle);
        Task<int> addTrackAgenda(Dictionary<string, object> parametros);
    }
}