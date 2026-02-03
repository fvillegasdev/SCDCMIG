using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IUbicacionCoordenadas : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IUbicacionCoordenadas>
    {
        new Task<object[]> Save(m.SCV.Interfaces.IUbicacionCoordenadas parametros);
        Task<object[]> GetById(Dictionary<string, object> parametros);
    }
}
