using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;

namespace EK.Procesos.SDC.Interfaces
{
    [m.Kontrol.KontrolName("estadoCuenta")]
    public interface IEstadoCuenta
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SDC.Interfaces.IEstadoCuenta>
    {
    }
}