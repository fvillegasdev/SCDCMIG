using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("Parametros")]
    public interface IParametros 
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IParametro>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<m.Kontrol.Interfaces.IParametros> Get(string section);

        Task<List<m.Kontrol.Interfaces.IParametro>> GetAllParametros(Dictionary<string,object> parametros);

        Task<m.Kontrol.Interfaces.IParametro> GetByIDParametros(Dictionary<string, object> parametros);

    }
}