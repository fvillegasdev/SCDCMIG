using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Procesos.Kontrol.Interfaces
{
    public interface ITrackingBP : IBaseProceso
    {
        Task<string> DoAction(Dictionary<string, object> parametros);
    }
}
