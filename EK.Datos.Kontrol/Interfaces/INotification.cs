using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface INotification
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IMessageNotification>
    {
        //Task<int> SaveNotificacion(m.Kontrol.Interfaces.IMessageNotification notificacion);
        //imodel.ISingleNotification GetSingleNotification(int id);
        Task<object[]> GetMessageNotifications(int idUser);
        Task<object[]> GetMessageNotificationsApp(int idUser);
        //List<imodel.ISingleNotification> GetSingleNotifications(int IdUser, bool? leidos);
        //int SaveNotificacion(imodel.ISingleNotification notificacion);
    }
}
