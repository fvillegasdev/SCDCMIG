using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("TMComisiones")]
    public interface ITmComisiones
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ITmComisiones>
    {
        //Task<List<m.SCV.Interfaces.IComisionCompania>> GetAllComisionCompania(Dictionary<string, object> parametros);
        Task<object> GetAllComisionCompania(Dictionary<string, object> parametros);
    }

}
