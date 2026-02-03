using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Notificadores
        : p.Kontrol.BPBase<m.Kontrol.Interfaces.INotificadores, d.Kontrol.Interfaces.INotificadores>, p.Kontrol.Interfaces.INotificadores
    {
        public Notificadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.INotificadores dao)
            : base(factory, dao, "Notificadores")
        {
        }


    }
}