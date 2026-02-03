using p = EK.Procesos;
using m = EK.Modelo;
namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("AsociacionCivil")]
    public interface IAsociacionCivil : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IAsociacionCivil>
    {
    }
}
