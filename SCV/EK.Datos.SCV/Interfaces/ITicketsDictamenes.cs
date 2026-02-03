using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface ITicketsDictamenes
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ITicketDictamen>
    {
    }
}