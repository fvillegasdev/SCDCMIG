using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("blogPost")]
    public interface IBlogPost
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IBlogPost>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}