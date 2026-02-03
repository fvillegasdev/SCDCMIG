using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface ITareasManuales
        : IDAOBaseGeneric<m.Kontrol.Interfaces.ITareaManual>
    {
        Task<object[]> GetAllTareasManuales(Dictionary<string, object> parametros);
    }
}
