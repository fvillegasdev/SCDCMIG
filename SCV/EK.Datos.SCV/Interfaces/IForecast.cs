using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IForecast
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.IForecast>
    {
    }
}
