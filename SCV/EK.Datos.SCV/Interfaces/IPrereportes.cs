using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPrereportes
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPrereporte>
    {
        Task<m.SCV.Interfaces.IPrereporte> GetByFolio(int folio);
    }
}