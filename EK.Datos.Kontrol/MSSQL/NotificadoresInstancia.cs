using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class NotificadoresInstancia
      : DAOBaseGeneric<m.Kontrol.Interfaces.INotificadoresInstancia>, d.Kontrol.Interfaces.INotificadoresInstancia
    {
        private const string USP_NOTIFICADORES_INSTANCIA_SELECT = "usp_tareaInstancia_notificadores";
        public NotificadoresInstancia(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_NOTIFICADORES_INSTANCIA_SELECT, null, "NotificadoresInstancia") { }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> obtenerUsuariosAutorizadoresTareaInstancia(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuario>(
                    USP_NOTIFICADORES_INSTANCIA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<object> GetUsersByTaskInstance(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_NOTIFICADORES_INSTANCIA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}