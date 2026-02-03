using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class TareaInstance 
        : DAOBaseGeneric<m.Kontrol.Interfaces.ITareaInstancia>, Interfaces.ITareaInstance
    {
        private const string USP_TAREAINSTANCIA_SELECT = "usp_tareainstancia_select";
        private const string USP_TAREAINSTANCIA_AUTORIZADORES = "usp_tareaInstancia_notificadores";


        public TareaInstance(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper, 
                  USP_TAREAINSTANCIA_SELECT, 
                  string.Empty,
                  "tareaInstancias")
        { }

        public async Task<object[]> GetNotificadores(int idInstancia)
        {
            object[] retValue = null;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idInstancia", idInstancia }
                };

                retValue = await helper.CreateEntitiesAsync(USP_TAREAINSTANCIA_AUTORIZADORES, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> GetAutorizadoresTarea(int idInstancia)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idInstancia", idInstancia }
                };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuario>(
                    USP_TAREAINSTANCIA_AUTORIZADORES, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //public m.Kontrol.Interfaces.ITareaInstancia GetTaskInstanceByIdTask(int idTareaInstancia)
        //{
        //    List<m.Kontrol.Interfaces.ITareaInstancia> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdTareaInstancia ",idTareaInstancia }
        //        };
        //        result = helper.CreateEntities<m.Kontrol.Interfaces.ITareaInstancia>(USP_TAREAINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);
        //        return result.Count == 0 ? null : result[0];
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public m.Kontrol.Interfaces.ITareaInstancia InsertTaskInstance(m.Kontrol.Interfaces.ITareaInstancia ti)
        //{

        //   List<m.Kontrol.Interfaces.ITareaInstancia> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //        };

        //        result = helper.CreateEntities<m.Kontrol.Interfaces.ITareaInstancia>(USP_TAREAINSTANCIA_INSERT, CommandType.StoredProcedure, parameters);
        //        return result.Count == 0 ? null : result[0];
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        #region "Proceso de Autorizacion de Tareas"        
        //public m.Kontrol.Interfaces.ITareaInstancia UpdateTaskInstance(m.Kontrol.Interfaces.ITareaInstancia ti)
        //{
        //    List<m.Kontrol.Interfaces.ITareaInstancia> result = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            //{ "TareaInstanciaId",ti.ID },
        //            //{ "FlujoTrabajoInstanciaId", ti.FlujoTrabajoInstanciaId },
        //            //{ "IdStatus", ti.IdStatus },
        //            //{ "Comentarios", ti.Comentarios },
        //            //{ "ModificadoPor", ti.IdModificadoPor },
        //            //{ "AprobadoPor", ti.IdAprobadoPor },
        //            //{ "Estado", ti.EstadoStr }                                                           
        //    };

        //        result = helper.CreateEntities<m.Kontrol.Interfaces.ITareaInstancia>(USP_TAREAINSTANCIA_ENDTASK, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null:result[0];
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }

        //}

        #endregion
    }
}
