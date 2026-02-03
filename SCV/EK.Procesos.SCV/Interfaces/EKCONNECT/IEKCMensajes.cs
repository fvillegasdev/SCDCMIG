using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using p = EK.Procesos;
using m = EK.Modelo;
using EK.Modelo.Kontrol.EKCONNECT;

namespace EK.Procesos.SCV.Interfaces.EKCONNECT
{
    [m.Kontrol.KontrolName("EKCMensajes")]

    public interface IEKCMensajes : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>
    {
        Task<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> recibir(EKCRequestData parametros);
        Task<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> enviar(Dictionary<string, object> parametros);
        // Task<List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>> enviar(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>> enviarArchivos(Dictionary<string, object> parametros);
        //Task<int> enviar(Dictionary<string, object> parametros);
        //Task<m.SCV.Interfaces.EKCONNECT.IEKCChats> enviar(EKCRequestData parametros);
        //Task<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> getByMensajeId(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>> getByChatId(Dictionary<string, object> parametros);
        Task<int> LogErrors(Dictionary<string, object> parametros);

    }
}
