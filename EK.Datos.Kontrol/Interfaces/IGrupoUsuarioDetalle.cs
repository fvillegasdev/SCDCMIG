using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IGruposUsuarioDetalle
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.Kontrol.Interfaces.IGruposUsuarioDetalle>
    {
        Task<object> GetGroupsDetailsUser(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IUsuariosGrupoDetalle>> GetUsersGroupDetails(Dictionary<string, object> parametros);

        Task<List<m.Kontrol.Interfaces.IPosicion>> GetUsersGroupWithPositions(Dictionary<string, object> parametros);
    }
}
