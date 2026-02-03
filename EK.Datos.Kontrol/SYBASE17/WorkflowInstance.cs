using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
//using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

using Newtonsoft.Json;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class WorkflowInstance
        : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IWorkflowInstance>, d.Kontrol.Interfaces.IWorkflowInstance
    {
        private const string USP_FLUJOTRABAJOINSTANCIA_SELECT = "usp_flujotrabajoinstancia_select";
        private const string USP_FLUJOTRABAJOINSTANCIA_NOTIFICADORES = "usp_flujotrabajoinstancia_notificadores";

        public WorkflowInstance(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper,
                  USP_FLUJOTRABAJOINSTANCIA_SELECT,
                  string.Empty,
                  "flujoTrabajoInstancia")
        { }

        public async Task<string> GetReferencia(int idInstancia)
        {
            string retValue = null;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", idInstancia },
                    { "referencia", 1}
                };

                dynamic result = await helper.CreateSingleEntityAsync(USP_FLUJOTRABAJOINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);

                if (result != null) {
                    retValue = Convert.ToString(result.Referencia);
                }

                return retValue;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<object[]> GetNotificadores(int idInstancia)
        {
            object[] retValue = null;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idInstancia", idInstancia }
                };

                retValue = await helper.CreateEntitiesAsync(USP_FLUJOTRABAJOINSTANCIA_NOTIFICADORES, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> GetUsuariosPropietarios(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuario>(
                    USP_FLUJOTRABAJOINSTANCIA_SELECT, CommandType.StoredProcedure, parametros);

            }
            catch (Exception)
            {
                throw;
            }
        }



        //public async Task<object[]> GetNotificadores(int idInstancia)
        //{
        //    object[] retValue = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "idInstancia", idInstancia }
        //        };

        //        retValue = await helper.CreateEntitiesAsync(USP_FLUJOTRABAJOINSTANCIA_NOTIFICADORES, CommandType.StoredProcedure, parameters);

        //        return retValue;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
    }
}
