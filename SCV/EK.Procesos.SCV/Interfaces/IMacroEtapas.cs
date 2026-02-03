using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("MacroEtapas")]

    public interface IMacroEtapas
        : p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
