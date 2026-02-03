using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("Dominios")]
    public interface IDominios
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IDominios>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object[]> GetLicenseInfo(int idDominio);
    }
}