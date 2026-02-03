using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Notification
        : DAOBaseGeneric<m.Kontrol.Interfaces.IMessageNotification>, d.Kontrol.Interfaces.INotification
    {
        private const string USP_NOTIFICACIONES_SELECT = "usp_notificaciones_select";
        private const string USP_NOTIFICACIONESAPP_SELECT = "usp_notificacionesapp_select";

        public Notification(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper, 
                  USP_NOTIFICACIONES_SELECT,
                  string.Empty,
                  "notificaciones")
        { }

        public async Task<object[]> GetMessageNotifications(int idUser)
        {
            object[] retValue;

            try
            {

                var parameters = new Dictionary<string, object>
                {
                    { "IdUser",idUser }
                };

                retValue = await helper.CreateEntitiesAsync(USP_NOTIFICACIONES_SELECT, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (System.Exception)
            {
                throw;
            }
        }
        public async Task<object[]> GetMessageNotificationsApp(int idUser)
        {
            object[] retValue;

            try
            {

                var parameters = new Dictionary<string, object>
                {
                    { "IdUser",idUser }
                };

                retValue = await helper.CreateEntitiesAsync(USP_NOTIFICACIONESAPP_SELECT, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}
