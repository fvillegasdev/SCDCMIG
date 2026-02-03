using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("CatalogosGenerales")]
    public interface ICatalogosGenerales 
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IItemGeneral>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}