using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using p = EK.Procesos;
using m = EK.Modelo;
namespace EK.Procesos.SCV.Interfaces.EKCONNECT
{
    [m.Kontrol.KontrolName("EKCChats")]
    public interface IEKCChats : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.EKCONNECT.IEKCChats>
    {
        Task<int> createChat(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.EKCONNECT.IEKCChats>> getAllChats(Dictionary<string, object> parametros);

    }
}
