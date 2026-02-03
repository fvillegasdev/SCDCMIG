using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;


namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("UnidadMedida")]
    public interface IUnidadMedida
        :p.Kontrol.Interfaces.IBaseProceso,m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IUnidadMedida>
    {
        Task<object> GetUnidadMedida(Dictionary<string, object> parametros);
    }
}
