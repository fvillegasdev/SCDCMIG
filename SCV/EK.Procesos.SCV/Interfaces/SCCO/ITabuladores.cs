using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("TabuladoresInsumos")]
    public interface ITabuladores
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.ITabulador>
    {
        Task<List<m.SCCO.Interfaces.ITabuladorInsumo>> GetInsumos(Dictionary<string, object> parametros);
    }
}