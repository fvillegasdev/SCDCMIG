using System.Threading.Tasks;
using System.Collections.Generic;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("Opciones")]
    public interface IOpciones 
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IOpcionModulo>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.Kontrol.Interfaces.IOpcionModulo>> GetDashBoards(Dictionary<string, object> parametros);
    }
}
