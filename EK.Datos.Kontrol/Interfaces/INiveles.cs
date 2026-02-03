using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface INiveles
        : IDAOBaseGeneric<m.Kontrol.Interfaces.INivel>
    {
        Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetConfiguracion(int idNivel, int idModulo);
    }
}