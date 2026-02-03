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
    [m.Kontrol.KontrolName("Origen")]
    public interface IOrigen : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object> GetTipoOrigen(Dictionary<string,object> parametros);
    }
}