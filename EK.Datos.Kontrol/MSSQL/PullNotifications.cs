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
    public class PullNotifications
     : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IPullNotifications>,
        d.Kontrol.Interfaces.IPullNotifications
    {
        private const string USP_PULLNOTIFICATIONS_SELECT = "usp_PullNotifications_select";
        private const string USP_WORKFLOWBP_SELECT = "usp_PullNotificationsBP_select";

        public PullNotifications(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PULLNOTIFICATIONS_SELECT, null, "PullNotifications") {
        }

        public async Task<m.Kontrol.Interfaces.IPullNotificationsEntities> GetBPWorkFlow(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IPullNotificationsEntities>(USP_WORKFLOWBP_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
