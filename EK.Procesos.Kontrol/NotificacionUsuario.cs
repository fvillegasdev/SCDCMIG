using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class NotificacionUsuario
        : BPBase<m.Kontrol.Interfaces.INotificacionUsuario, d.Kontrol.Interfaces.INotificacionUsuario>, p.Kontrol.Interfaces.INotificacionUsuario
    {
        public NotificacionUsuario(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.INotificacionUsuario dao)
            : base(factory, dao, "notificacion_usuario")
        {
        }
    }
}
