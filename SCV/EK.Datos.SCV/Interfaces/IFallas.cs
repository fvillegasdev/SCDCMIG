using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IFallas
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IFalla>
    {
    }
}