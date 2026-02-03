using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;


namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("expedientesFiniquito")]
    public interface IFiniquito
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IFiniquito>
    {
        Task<object> GetExpedientesFiniquito(Dictionary<string, object> parametros);

        Task<m.SCV.Interfaces.IFiniquito> CancelarFiniquito(List<int> Expedientes);

    }
}


