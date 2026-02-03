using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.Interfaces
{
    public interface IAgenda
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IAgenda>
    {
        Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getUsersCalendarDashBoard(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getStateCalendarDashBoard(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgenda>> getGeoCalendarDashBoard(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.IModificarAgenda> getFechaAgendaCliente(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IHistorialCambioAgenda>> getHistorialModificacionAgenda(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.IModificarAgenda> SaveCambioAgenda(Dictionary<string, object> parametros);
    }
}