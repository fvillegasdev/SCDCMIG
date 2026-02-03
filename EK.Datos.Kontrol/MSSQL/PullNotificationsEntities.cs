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
    public class PullNotificationsEntities
     : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IPullNotificationsEntities>,
        d.Kontrol.Interfaces.IPullNotificationsEntities
    {
        private const string USP_PULLNOTIFICATIONSENTITIES_SELECT = "usp_PullNotificationsEntities_select";

        public PullNotificationsEntities(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PULLNOTIFICATIONSENTITIES_SELECT, null, "PullNotificationsEntities") {
        }
    }
}
