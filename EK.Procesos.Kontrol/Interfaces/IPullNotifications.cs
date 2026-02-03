using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("PullNotifications")]

    public interface IPullNotifications : IBaseProceso
    {
        Task<m.Kontrol.Interfaces.IPullNotifications> SendNotification(string[] emails, string asunto, string contenido, string entityName, dynamic obj);
        Task<object> ActionMethod(Dictionary<string, object> parametros);
    }
}
