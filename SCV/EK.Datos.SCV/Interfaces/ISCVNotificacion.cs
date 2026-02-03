using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;


namespace EK.Datos.SCV.Interfaces
{
    public interface ISCVNotificacion
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ISCVNotification>
    {
    }
}
