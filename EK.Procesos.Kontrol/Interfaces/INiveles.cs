using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("Niveles")]
    public interface INiveles 
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.INivel>, Kontrol.Interfaces.IBaseProceso
    {
        Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetConfiguracion(int idNivel, int idModulo);
    }
}