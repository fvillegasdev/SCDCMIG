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
    public class NotificacionMarcadores
        : BPBase<m.Kontrol.Interfaces.INotificacionMarcadores, d.Kontrol.Interfaces.INotificacionMarcadores>, p.Kontrol.Interfaces.INotificacionMarcador
    {
        public NotificacionMarcadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.INotificacionMarcadores dao)
             : base(factory, dao, "notificacion_marcadores")
        {
        }
    }
}
