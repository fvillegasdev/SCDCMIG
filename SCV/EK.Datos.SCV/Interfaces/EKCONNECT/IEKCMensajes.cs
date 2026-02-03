using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces.EKCONNECT
{
    public interface IEKCMensajes : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>
    {
        Task<int> SaveMensaje(Dictionary<string, object> parametros);
        Task<int> LogErrors(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>> getByChatId(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> getByMensajeId(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> getByIdWA(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> UdateIdWAMensaje(int IdMensaje, string idWA);

    }
}
