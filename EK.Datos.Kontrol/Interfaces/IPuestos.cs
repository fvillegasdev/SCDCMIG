using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IPuestos
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IPuesto>
    {
        Task<object[]> GetAllPuestos(Dictionary<string, object> parametros);
    }
}
