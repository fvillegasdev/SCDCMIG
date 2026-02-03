using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using System.Collections.Generic;
using miSCV = EK.Modelo.SCV.Interfaces;
using miSBO = EK.Modelo.SBO.Interfaces;

namespace EK.Datos.SCV.Interfaces
{
    public interface IDesarrollos
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IDesarrollos>
    {
        Task<object> GetByDesarrolloId(Dictionary<string, object> parametros);

        Task<m.SCV.Interfaces.IDesarrollos> GetByIdDesarrollo(Dictionary<string, object> parametros);
    }
}
