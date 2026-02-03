using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;



namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("sv_notificacion_usuario")]
    public interface INotificacionUsuario
         : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.INotificacionUsuario>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
