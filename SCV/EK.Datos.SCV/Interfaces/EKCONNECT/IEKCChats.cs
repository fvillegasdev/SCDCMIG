using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces.EKCONNECT
{
    public interface IEKCChats : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.EKCONNECT.IEKCChats>
    {
        Task<int> SaveChat(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.EKCONNECT.IEKCChats>> GetAllChats(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.EKCONNECT.IEKCChats> getOrCreate(Dictionary<string, object> parametros);

    }
}
