using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SGP.Interfaces
{
    [m.Kontrol.KontrolName("TipoProyectoSGP")]
    public interface ITipoProyecto 
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SGP.Interfaces.ITipoProyecto>
    {
    }
}