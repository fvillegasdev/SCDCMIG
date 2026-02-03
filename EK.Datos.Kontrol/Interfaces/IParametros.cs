using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IParametros
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IParametro>
    {
        Task<List<m.Kontrol.Interfaces.IParametro>> GetParametrosGlobal(string seccion);
        Task<List<m.Kontrol.Interfaces.IParametro>> GetAllParametros(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.IParametro> GetByIDParametros(Dictionary<string, object> parametros);
    }
}
