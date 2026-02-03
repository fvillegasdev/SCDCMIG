using System.Threading.Tasks;
using System.Collections.Generic;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ConceptosPago")]
    public interface IConceptosPago
        : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.SCV.Interfaces.IConceptoPago>> GetPorTipo(string tipo);

        Task<object> GetConceptosPago(Dictionary<string,object> parametros);
    }
}