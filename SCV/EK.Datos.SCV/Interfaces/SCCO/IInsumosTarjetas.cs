using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.Interfaces
{
    public interface IInsumosTarjetas
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCCO.Interfaces.IInsumoTarjeta>
    {
        Task<m.SCCO.Interfaces.IInsumoTarjeta> GetByIdInsumo(int idInsumo);
    }
}