using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using System.Data;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Workflow 
        : DAOBaseGeneric<m.Kontrol.Interfaces.IWorkflow>, d.Kontrol.Interfaces.IWorkflow
    {
        private const string USP_FLUJOTRABAJO_SELECT = "usp_flujotrabajo_select";
        private const string USP_REGLA_SELECT = "usp_tareaReglas_select";
        private const string USP_REGLA_INS_UPD = "usp_tareaRegla_ins_upd";
        private const string USP_NOTIFICADORES_SELECT = "usp_notificadores_select";

        public Workflow(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_FLUJOTRABAJO_SELECT,
                  string.Empty,
                  "FlujoTrabajo")
        { }

        public async Task<List<m.Kontrol.Interfaces.IWorkflow>> GetWorkflowByTipo(string ClaveTipo)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "ClaveTipo", ClaveTipo}
                };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IWorkflow>(
                    USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IWorkflow>> GetFlujoTrabajo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IWorkflow>(
                    USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public async Task<List<imodel.IWorkflow>> GetWorkflowsList(int idTipo)
        //{
        //    List<imodel.IWorkflow> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "idTipo", idTipo }
        //        };

        //        result = await helper.CreateEntitiesAsync<imodel.IWorkflow>(USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public async Task<List<imodel.IWorkflow>> GetWorkflowsByIdUser(int IdUser)
        //{
        //    List<imodel.IWorkflow> result = null;
        //    try
        //    {
        //        result = await helper.CreateEntitiesAsync<imodel.IWorkflow>(USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
        //public async Task<imodel.IWorkflow> GetWorkflowById(int id)
        //{
        //    imodel.IWorkflow result = null;

        //    try
        //    {
        //        // Workflow INFO
        //        var parameters = new Dictionary<string, object> {
        //                { "Id", id }
        //        };
        //        result = await helper.CreateSingleEntityAsync<imodel.IWorkflow>(USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure, parameters);

        //        // Tareas INFO
        //        parameters = new Dictionary<string, object> {
        //                { "IdFlujo", id }
        //        };
        //        result.Tareas = await helper.CreateEntitiesAsync<imodel.ITarea>(USP_TAREA_SELECT, CommandType.StoredProcedure, parameters);

        //        foreach (var tarea in result.Tareas) {
        //            parameters = new Dictionary<string, object> {
        //                { "IdTarea", tarea.ID }
        //            };

        //            tarea.Reglas = await helper.CreateEntitiesAsync<imodel.IReglaTarea>(USP_REGLA_SELECT, CommandType.StoredProcedure, parameters);
        //        }

        //        return result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public async Task<imodel.IWorkflow> GetWorkflowByKey(string TypeKey)
        //{
        //    List<imodel.IWorkflow> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "ClaveTipo",TypeKey}
        //        };

        //        result = await helper.CreateEntitiesAsync<imodel.IWorkflow>(USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure,parameters);

        //        return result.Count == 0 ? null : result[0];
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        //public async Task<List<imodel.ITarea>> GetTasksByWorkflow(int idFlujo)
        //{
        //    List<imodel.ITarea> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdFlujo",idFlujo }
        //        };

        //        result = await helper.CreateEntitiesAsync<imodel.ITarea>(USP_TAREA_SELECT, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        //public List<imodel.INotificador> GetNotifiersByWorkflow(int idFlujo)
        //{
        //    List<imodel.INotificador> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdFlujo",idFlujo }
        //        };

        //        result = helper.CreateEntities<imodel.INotificador>(USP_NOTIFICADORES_SELECT, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        //public List<imodel.IUsuario> GetUsersNotifiersByWorkflow(int idFlujo)
        //{
        //    List<imodel.IUsuario> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdFlujo",idFlujo }
        //        };

        //        result = helper.CreateEntities<imodel.IUsuario>(USP_USUARIOSNOTIFICADORES_SELECT, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        //public List<imodel.INotificador> GetPossibleNotificators(string search)
        //{
        //    List<imodel.INotificador> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "Filtro",search },
        //                { "ClaveEstatus","A" }
        //        };

        //        result = helper.CreateEntities<imodel.INotificador>(USP_NOTIFICADORES_SEARCH, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //}

        //public async Task<int> SaveWorkflow(imodel.IWorkflow wf) {
        //    int result = -1;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object> {
        //                { "ID", wf.ID },
        //                { "Nombre", wf.Nombre },
        //                { "Alias", wf.Alias },
        //                { "ModificadoPor", wf.IdModificadoPor },
        //                { "IdTipo", wf.IdTipo },
        //                { "IdEstatus", wf.IdEstatus },
        //                { "NotificarJefeDirecto", wf.JefeDirecto },
        //                { "NotificarIdPuesto", wf.IdPuesto },
        //                { "NotificarIdPosicion", wf.IdPosicion },
        //                { "NotificarPuestoJerarquia", wf.PuestoJerarquia },
        //                { "NotificarPuestoTodos", wf.PuestoTodos }
        //            };

        //        result = await helper.GetResultAsync(USP_FLUJOTRABAJO_INS_UPD, CommandType.StoredProcedure, parameters);

        //        return result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public async Task<int> SaveTarea(int idWorkflow, imodel.ITarea tarea)
        //{
        //    int result = -1;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "ID", tarea.ID },
        //                { "IdFlujo", idWorkflow },
        //                { "Orden", tarea.Orden },
        //                { "DiasVigencia", tarea.DiasVigencia },
        //                { "Descripcion", tarea.Descripcion },
        //                { "Estado", tarea.EstadoTarea },
        //                { "ModificadoPor", tarea.IdModificadoPor },
        //                { "JefeDirecto", tarea.JefeDirecto },
        //                { "IdPuesto", tarea.IdPuesto },
        //                { "IdPosicion", tarea.IdPosicion },
        //                { "PuestoJerarquia", tarea.PuestoJerarquia },
        //                { "PuestoTodos", tarea.PuestoTodos }
        //        };

        //        result = await helper.GetResultAsync(USP_TAREA_INS_UPD, CommandType.StoredProcedure, parameters);

        //        return result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public async Task<int> SaveRegla(int idTarea, imodel.IReglaTarea regla)
        //{
        //    int result = -1;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "ID", regla.ID },
        //                { "IdTarea", idTarea },
        //                { "Campo", regla.Campo },
        //                { "Operador", regla.Operador },
        //                { "Valor", regla.Valor },
        //                { "ModificadoPor", regla.IdModificadoPor }
        //        };

        //        result = await helper.GetResultAsync(USP_REGLA_INS_UPD, CommandType.StoredProcedure, parameters);

        //        return result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public async Task<int> DeleteTarea(int idTarea) {
        //    return await base.DeleteEntity(idTarea, "TareaId", "Tareas");
        //}

        //public async Task<int> DeleteRegla(int idRegla)
        //{
        //    return await base.DeleteEntity(idRegla, "ID", "TareaReglas");
        //}

        //public bool SaveNotifierWorkflow(int FlujoId, int NotificadorId, string Tipo)
        //{            
        //    try
        //    {
        //        var sTipo = Tipo.Substring(0, 1);
        //        string Field = sTipo == "U" ? "IdUsuario" : "IdNivel";
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdFlujo",FlujoId },
        //                { Field, NotificadorId},
        //                { "Tipo",Tipo}
        //        };

        //        helper.CreateEntities<imodel.IWorkflow>(USP_NOTIFICADORES_INSERT, CommandType.StoredProcedure, parameters);

        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public bool DeleteNotifierWorkflow(int FlujoId)
        //{
        //    try
        //    {                                
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdFlujo",FlujoId }
        //        };

        //        helper.CreateEntities<imodel.IWorkflow>(USP_NOTIFICADORES_DELETE, CommandType.StoredProcedure, parameters);

        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //}

        ////FUNCION DEL PROCESO DE GENERACION DE WORKFLOWS******************************
        //public bool ValidateWorkflowDuplicity(int Entidad)
        //{
        //    Dictionary<string, object> parameters = null;
        //    List<imodel.IWorkflow> result = null;

        //    try
        //    {
        //        string sqlQuery = @"SELECT F.FlujoId as [ID],F.Nombre,F.Alias, 
        //                    F.Creado,F.Modificado, 
        //                    F.CreadoPor,
        //                    F.ModificadoPor, 
        //                    TF.IdAmbito as [IdAmbito], 
        //                    F.Entidad as [IdEntidad], 
        //                    F.IdEstatus,F.Automatico
        //                FROM dbo.FlujoTrabajo F    
        //                JOIN dbo.TipoFlujoTrabajo TF ON(F.IdTipo=TF.Id)               
        //                JOIN dbo.CatalogosGeneralesValores CEst ON(F.IdEstatus = CEst.Id) 
        //                WHERE Entidad=@Entidad and CEst.Clave='A'";

        //        parameters = new Dictionary<string, object>();
        //        parameters.Add("Entidad", Entidad);

        //        result = helper.CreateEntities<model.Interfaces.IWorkflow>(sqlQuery, CommandType.Text, parameters);

        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }

        //    return (result.Count>1 || result==null) ? true : false;
        //}


        //public imodel.ITarea GetWorkflowTasksById(int idTarea)
        //{
        //    List<imodel.ITarea> result = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdTarea",idTarea }
        //        };

        //        result = helper.CreateEntities<imodel.ITarea>(USP_TAREA_SELECT, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result[0];
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


    }
}
