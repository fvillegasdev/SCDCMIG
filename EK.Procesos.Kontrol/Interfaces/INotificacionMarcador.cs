using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;


namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("sv_notificacion_marcadores")]
    public interface INotificacionMarcador
         : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.INotificacionMarcadores>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
