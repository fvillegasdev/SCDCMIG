using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("FlujoTrabajoInstancia")]
    public interface IFlujoTrabajoInstancia
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IWorkflowInstance>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.Kontrol.Interfaces.IUsuario>> getUsuariosPropietarios(Dictionary<string, object> parametros);

    }
}