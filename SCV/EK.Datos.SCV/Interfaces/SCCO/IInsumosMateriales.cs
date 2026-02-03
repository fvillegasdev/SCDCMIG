using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.Interfaces
{
    public interface IInsumosMateriales
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCCO.Interfaces.IInsumoMaterial>
    {
        Task<m.SCCO.Interfaces.IInsumoMaterial> GetByIdInsumo(int idInsumo);
    }
}