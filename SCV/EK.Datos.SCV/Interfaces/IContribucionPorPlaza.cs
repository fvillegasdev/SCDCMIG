using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IContribucionPorPlaza
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IContribucionPorPlaza>
    {
        Task<object[]> GetConsulta(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaTopIncidencias(Dictionary<string, object> parametros);
    }
}