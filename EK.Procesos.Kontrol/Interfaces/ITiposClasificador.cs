using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("tiposClasificador")]
    public interface ITiposClasificador
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.ITipoClasificador>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object[]> GetAllTiposClasificador(Dictionary<string, object> parametros);

    }
}
