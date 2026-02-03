using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IComisionesRevisionDetalle
        :d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IComisionesRevisionDetalle>
    {
        Task<m.SCV.Interfaces.IComisionesRevisionDetalle> GetRevisionDetalle(int IdRevision, int nRevision);

    }
}
