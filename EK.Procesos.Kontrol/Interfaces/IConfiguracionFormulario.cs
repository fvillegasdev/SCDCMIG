using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("ConfiguracionFormulario")]
    public interface IConfiguracionFormulario
        : m.Kontrol.Interfaces.IBPBase
        <m.Kontrol.Interfaces.IConfiguracionFormulario>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}