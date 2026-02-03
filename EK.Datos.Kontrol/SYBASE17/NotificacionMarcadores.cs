using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class NotificacionMarcadores
        : DAOBaseGeneric<m.Kontrol.Interfaces.INotificacionMarcadores>, d.Kontrol.Interfaces.INotificacionMarcadores
    {
        private const string USP_NOTIFICACIONESMARCADORES_SELECT = "usp_notificaciones_select";

        public NotificacionMarcadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
           : base(
                 factory,
                 helper,
                 USP_NOTIFICACIONESMARCADORES_SELECT,
                 string.Empty,
                 "sv_notificacion_marcadores")
        { }
    }
}
