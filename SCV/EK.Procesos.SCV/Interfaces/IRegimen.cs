using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Regimen")]
    public interface IRegimen:
        p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IRegimen>
    {
        //Tarea GetAllRegimenCompania
        Task<object> GetAllRegimenCompania(Dictionary<string, object> parametros);
        Task<object> GetRegimen(Dictionary<string,object>parametros);
    }
}
