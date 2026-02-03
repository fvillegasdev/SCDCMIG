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
    public class PullNotificationsActions
     : p.Kontrol.BPBase<m.Kontrol.Interfaces.IPullNotificationsActions, d.Kontrol.Interfaces.IPullNotificationsActions>, p.Kontrol.Interfaces.IPullNotificationsActions
    {
        #region Constructor

        public PullNotificationsActions(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPullNotificationsActions dao)
           : base(factory, dao, "PullNotificationsActions")
        {
        }

        #endregion Constructor
    }
}