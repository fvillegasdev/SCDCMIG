using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("tramiteasignadoconfiguracion")]
    public interface ITramiteAsignadoConfiguracion
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ITramiteAsignadoConfiguracion>
    {
    }
}
