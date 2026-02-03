using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("BlogPostCategorias")]
    public interface IBlogPostCategorias
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IBlogPostCategorias>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}