using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("GISVistas")]
    public interface IVistas 
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IVistas>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object> GetVistas(int idDesarrollo);
        Task<object[]> GetVistaColores(int idVista, int idDesarrollo);
    }
}
