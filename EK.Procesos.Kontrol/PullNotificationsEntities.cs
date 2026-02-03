using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EK.Drivers.Log;
using Newtonsoft.Json;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class PullNotificationsEntities
     : p.Kontrol.BPBase<m.Kontrol.Interfaces.IPullNotificationsEntities, d.Kontrol.Interfaces.IPullNotificationsEntities>, p.Kontrol.Interfaces.IPullNotificationsEntities
    {
        #region Constructor

        public PullNotificationsEntities(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPullNotificationsEntities dao)
           : base(factory, dao, "PullNotificationsEntities")
        {
        }

        #endregion Constructor
    }
}