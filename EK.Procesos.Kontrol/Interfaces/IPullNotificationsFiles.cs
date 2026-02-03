using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("PullNotificationsFiles")]

    public interface IPullNotificationsFiles : IBaseProceso
    {
        Task<m.Kontrol.Interfaces.IPullNotificationsFiles> CreateDocument(byte[] byteArray, dynamic retvalue);
    }
}
