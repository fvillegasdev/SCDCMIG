using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("Notificadores")]
    public interface INotificadores
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.INotificadores>, p.Kontrol.Interfaces.IBaseProceso
    {
    }
}