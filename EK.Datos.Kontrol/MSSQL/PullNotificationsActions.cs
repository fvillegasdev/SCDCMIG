using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;



namespace EK.Datos.Kontrol.MSSQL
{
    public class PullNotificationsActions
     : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IPullNotificationsActions>,
        d.Kontrol.Interfaces.IPullNotificationsActions
    {
        private const string USP_PULLNOTIFICATIONSACTIONS_SELECT = "usp_PullNotificationsActions_select";

        public PullNotificationsActions(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PULLNOTIFICATIONSACTIONS_SELECT, null, "PullNotificationsActions") {
        }
    }
}
