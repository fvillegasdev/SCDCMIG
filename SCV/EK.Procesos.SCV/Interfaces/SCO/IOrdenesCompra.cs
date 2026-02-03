using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCO.Interfaces
{
    [m.Kontrol.KontrolName("OrdenesCompra")]
    public interface IOrdenesCompra
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCO.Interfaces.IOrdenesCompra>
    {
         Task<m.SCV.Interfaces.IComisionesAprobacion> GeneracionOrdenesCompra(int idRevision);
    }
}
