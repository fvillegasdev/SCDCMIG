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
    public class PullNotificationsFiles
     : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IPullNotificationsFiles>,
        d.Kontrol.Interfaces.IPullNotificationsFiles
    {
        private const string USP_PULLNOTIFICATIONSFILES_SELECT = "usp_PullNotificationsFiles_select";

        public PullNotificationsFiles(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PULLNOTIFICATIONSFILES_SELECT, null, "PullNotificationsFiles") {
        }
    }
}
