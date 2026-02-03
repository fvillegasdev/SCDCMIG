using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("puestos")]
    public interface IPuesto
         : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IPuesto>
    {


    }
}


