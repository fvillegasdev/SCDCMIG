using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("comisionesConfiguracion")]
    public interface IComisionesConfiguracion :
        p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IAnios>

    {
        Task<object> GetAllPeriodoDetalle(Dictionary<string, object> parametros);

    }
}
