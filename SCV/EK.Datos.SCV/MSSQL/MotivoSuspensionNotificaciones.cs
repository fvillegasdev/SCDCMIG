using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class MotivoSuspensionNotificaciones
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IMotivoSuspensionNotificaciones>, d.SCV.Interfaces.IMotivoSuspensionNotificaciones
    {
        private const string USP_SCV_MOTIVOSUSPENSION_NOTIFICACIONES_SELECT = "usp_scv_motivosuspension_notificaciones_select";
        private const string USP_MOTIVOSUSPENSION_NOTIFICACIONES = "usp_motivoSuspension_notificadores";
        public MotivoSuspensionNotificaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_MOTIVOSUSPENSION_NOTIFICACIONES_SELECT, null, "scv_motivosuspension_notificaciones") { }

        public async Task<object> GetAllUsuario(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_MOTIVOSUSPENSION_NOTIFICACIONES, CommandType.StoredProcedure, parametros);

            }
            catch(Exception ex)
            {
                string error = ex.ToString();
                throw;
            }
        }


    }
}