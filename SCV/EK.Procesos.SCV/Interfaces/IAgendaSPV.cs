using m = EK.Modelo;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("AgendaSPV")]
    public interface IAgendaSPV
        : m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IAgendaSPV>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object> GetAgendaDetalleCita(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.ICalendar> getAgendaDashBoard(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgenda>> getAgendaDashBoardGrid(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.IAgenda> SaveDetProg(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.IModificarAgenda> SaveCambioAgenda(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getUsersCalendarDashBoard(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgenda>> getGeoCalendarDashBoard(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getStateCalendarDashBoard(Dictionary<string, object> parametros);
        Task<int> ValidateBloquesFechas(DateTime fechaInicio, DateTime fechaFin, int idUsuario, int idExpediente, string tipoAgenda);
        Task<int> ValidatePlanificacion(DateTime fechaInicio, DateTime fechaFin, int idUsuario, List<dynamic> items, string tipoAgenda);
        Task SendNotificationNewKalendar(List<m.Kontrol.Interfaces.IUsuario> usuarios, string nombrePlantilla, string link, object obj, Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.IAgenda> Save(m.Kontrol.Interfaces.IAgenda item);
        Task<m.SCV.Interfaces.IAgendaContratista> SaveAgendaContratista(m.SCV.Interfaces.IAgendaContratista item);
        Task<m.SCV.Interfaces.IAgendaContratista> SaveAgendaChangeContratista(m.SCV.Interfaces.IAgendaContratistaDetalle item);
        Task<m.SCV.Interfaces.IAgendaDictamen> SaveAgendaDictamen(m.SCV.Interfaces.IAgendaDictamen item);
        Task<m.SCV.Interfaces.IAgendaContratista> SaveDetProgContratista(m.SCV.Interfaces.IAgendaContratistaDetalle item);
        Task<m.SCV.Interfaces.IOrdenTrabajoRUBA> UpdatePlanificacion(int idOrden, m.SCV.Interfaces.IAgendaContratista agenda, m.SCV.Interfaces.IAgendaContratistaDetalle agendaDetalle, string agendaEstatus);
        Task<m.SCV.Interfaces.IReporteDictamen> UpdatePlanificacionDictamen(int idOrden, m.SCV.Interfaces.IAgendaDictamen agenda, m.SCV.Interfaces.IAgendaDictamenDetalle agendaDetalle, string agendaEstatus);
        Task<string> printDocumentAgendaDashBoardGrid(Dictionary<string, object> parametros);
    }
}