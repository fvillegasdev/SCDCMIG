using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("notificaciones")]
    public interface INotification
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IMessageNotification>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<m.Kontrol.Interfaces.IMessageNotification> GuardarNotificacion(m.Kontrol.Interfaces.IMessageNotification mensaje);
        Task<object> GetAllNotifications();
        Task<object> GetAllNotificationsFromApp();
        //List<modelo.INotificationElement> GetAllNotifications(int IdUser);

        //modelo.ISingleNotification GuardarNotificacion(string modelo);
    }
    //    List<modelo.INotification> GetAllNotifications(string typeElement);
    //}
}
