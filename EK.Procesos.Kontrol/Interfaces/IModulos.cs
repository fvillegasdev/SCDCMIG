using System.Threading.Tasks;
using mdl = EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
using p = EK.Procesos;
using System.Collections.Generic;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("modulos")]
    public interface IModulos
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IModulo>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<mdl.IOpcionModulo[]> GetOpciones(Dictionary<string, object> parametros);
        mdl.IOpcionModulo[] GetOpciones(mdl.IOpcionModulo[] opciones);
        Task<object[]> GetAccionesPorOpcion(string clave);
    }
}