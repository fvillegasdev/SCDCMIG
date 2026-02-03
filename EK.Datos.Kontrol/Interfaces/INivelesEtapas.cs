using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.Interfaces
{
    public interface INivelesEtapas
        : IDAOBaseGeneric<m.Kontrol.Interfaces.INivelesEtapas>
    {
        Task<object> obetnerEtapasNiveles(Dictionary<string, object> parametros);
    }
}