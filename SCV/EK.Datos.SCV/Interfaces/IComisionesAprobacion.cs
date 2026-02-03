using d = EK.Datos;
using m = EK.Modelo;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Datos.SCV.Interfaces
{
    public interface IComisionesAprobacion
        :d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IComisionesAprobacion>
    {
        Task<int> SaveRevisionDetalle(m.SCV.Interfaces.IComisionesRevision item);

        Task<List<m.SCV.Interfaces.IComisionesAprobacion>> GetRevisionDetalle(int IdRevision);

        Task<int> ValidarAprobacionRevision(int idRevision);
    }
}
