using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ComisionesAprobacion")]
    public interface IComisionesAprobacion
        :p.Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.SCV.Interfaces.IComisionesAprobacion>> ObtenerRevisionVigenteDetalle(Dictionary<string, object> parametros);
    }
}
