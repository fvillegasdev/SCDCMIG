using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("catalogoClasificador")]
    public interface ICatalogoClasificadores
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.ICatalogoClasificador>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
