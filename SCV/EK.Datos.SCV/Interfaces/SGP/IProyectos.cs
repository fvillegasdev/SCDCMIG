using System.Threading.Tasks;
using System.Collections.Generic;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SGP.Interfaces
{
    public interface IProyectos
        : dki.IDAOBaseGeneric<m.SGP.Interfaces.IProyectos>
    {
        Task<List<m.SGP.Interfaces.IColaboradores>> GetResourceAssignedTask(Dictionary<string, object> parametros);
    }
}
