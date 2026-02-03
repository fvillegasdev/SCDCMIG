using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class NotificacionUsuario
         : DAOBaseGeneric<m.Kontrol.Interfaces.INotificacionUsuario>, d.Kontrol.Interfaces.INotificacionUsuario
    {
        public NotificacionUsuario(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
          : base(
                factory,
                helper,
                string.Empty,
                string.Empty,
                "sv_notificacion_usuario")
        { }
    }
}
