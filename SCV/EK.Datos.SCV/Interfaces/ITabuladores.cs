using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using System.Collections.Generic;

namespace EK.Datos.SCV.Interfaces
{
    public interface ITabuladores
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ITabuladores>
    {

        Task<object> ObtenerEjecucionesPorTabulador(Dictionary<string,object> parametros);
        Task<object> ObtenerTabuladorPorID(int id);
    }
}
