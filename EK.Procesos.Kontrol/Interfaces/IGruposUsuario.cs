using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("GruposUsuario")]

    public interface IGruposUsuario
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IGruposUsuario>, p.Kontrol.Interfaces.IBaseProceso 
    {
        Task<object> GetGroupsDetailsUser(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IUsuariosGrupoDetalle>> GetUsersGroupDetails(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IPosicion>> GetUsersGroupWithPositions(Dictionary<string, object> parametros);
    }

}