using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Reasignacion")]
    public interface IReasignacion
        :p.Kontrol.Interfaces.IBaseProceso,m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IReasignacion>
    {
        Task<object> GetReasignacionProspecto(Dictionary<string, object> parametros);

        Task<object> GetReasignacionExpediente(Dictionary<string, object> parametros); 
    }
}
