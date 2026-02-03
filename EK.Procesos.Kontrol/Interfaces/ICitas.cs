using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("Citas")]
    public interface ICitas
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.ICitas>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}