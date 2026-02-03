using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("TipoObra")]

    public interface ITipoObra
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.ITipoObra>
    {
        Task<object> GetTipoObra(Dictionary<string, object> parametros);
    }
}