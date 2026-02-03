using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Tarea
        : DAOBaseGeneric<m.Kontrol.Interfaces.ITarea>, d.Kontrol.Interfaces.ITarea
    {
        private const string USP_TAREA_SELECT = "usp_tarea_select";
        private const string USP_TAREA_INS_UPD = "usp_tarea_ins_upd";

        //private const string USP_TAREABASE_SELECT = "dbo.usp_tareabase_select";
        //private const string USP_TAREA_INSERT = "dbo.usp_tarea_insert";
        //private const string USP_TAREA_UPDATE = "dbo.usp_tarea_update";
        //private const string USP_TAREA_DELETE = "dbo.usp_tarea_delete";
        //private const string USP_TAREA_REORDER = "dbo.usp_tarea_reorder";

        //private const string USP_DOCUMENTOSCOMUNES_SELECT = "dbo.usp_documentoscomunes_select";
        //private const string USP_DOCUMENTOSTAREA_INSERT = "dbo.usp_documentostarea_insert";
        //private const string USP_DOCUMENTOSTAREA_DELETE = "dbo.usp_documentostarea_delete";

        //private const string USP_ASIGNADOS_SELECT = "dbo.usp_tareaasignados_select";
        //private const string USP_ASIGNADOS_SEARCH = "dbo.usp_tareaasignados_search";
        //private const string USP_ASIGNADOS_INSERT = "dbo.usp_tareaasignados_insert";
        //private const string USP_ASIGNADOS_DELETE = "dbo.usp_tareaasignados_delete";
        //private const string USP_USUARIOSASIGNADOS_SELECT = "dbo.usp_tareaasignadosusuarios_select";

        public Tarea(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_TAREA_SELECT,
                  USP_TAREA_INS_UPD,
                  "Tareas")
        { }
        //public imodel.ITarea InsertTask(int idFlujo, imodel.ITarea task)
        //{
        //    List<imodel.ITarea> result = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "FlujoId", idFlujo},
        //                { "DiasVigencia", task.DiasVigencia },
        //                { "Descripcion", task.Descripcion },
        //                { "Estado", task.EstadoTarea },
        //                { "CreadoPor", task.IdModificadoPor },
        //                { "ModificadoPor", task.IdModificadoPor },
        //                { "Orden", task.Orden },
        //                { "IdEstatus", task.IdEstatus }
        //        };

        //        result = helper.CreateEntities<imodel.ITarea>(USP_TAREA_INSERT, CommandType.StoredProcedure, parameters);

        //        return result[0];
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public int UpdateTask(imodel.ITarea task)
        //{
        //    List<imodel.ITarea> result = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "TareaId",task.ID },
        //                { "DiasVigencia",task.DiasVigencia },
        //                { "Descripcion",task.Descripcion },
        //                { "Estado",task.EstadoTarea },                        
        //                { "ModificadoPor",task.IdModificadoPor },
        //                { "Orden",task.Orden }
        //        };

        //        result = helper.CreateEntities<imodel.ITarea>(USP_TAREA_UPDATE, CommandType.StoredProcedure, parameters);

        //        return 1;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //    //int result = 0;
        //    //SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString);

        //    //try
        //    //{
        //    //    SqlCommand cmd;
        //    //    string sqlQuery = @"UPDATE dbo.Tareas 
        //    //                        SET DiasVigencia=@DiasVigencia,
        //    //                            Descripcion=@Descripcion,
        //    //                            Modificado=GETUTCDATE(),
        //    //                            ModificadoPor=@ModificadoPor,
        //    //                            Estado=@EstadoTarea
        //    //                            WHERE TareaId=@TareaId ";

        //    //    cmd = new SqlCommand(sqlQuery, cn);
        //    //    cmd.Parameters.Add("@TareaId", SqlDbType.Int).Value = task.ID;
        //    //    cmd.Parameters.Add("@DiasVigencia", SqlDbType.Int).Value = task.DiasVigencia;
        //    //    cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar).Value = task.Descripcion;
        //    //    cmd.Parameters.Add("@ModificadoPor", SqlDbType.Int).Value = task.IdModificadoPor;
        //    //    cmd.Parameters.Add("@EstadoTarea", SqlDbType.NVarChar).Value = task.EstadoTarea;                

        //    //    cn.Open();
        //    //    result = cmd.ExecuteNonQuery();
        //    //    cn.Close();

        //    //    if (task.DocumentosAgregados.Count > 0)
        //    //    {
        //    //        DeleteTaskDocuments(cn, (int)task.ID);
        //    //        foreach (var docs in task.DocumentosAgregados)
        //    //        {
        //    //            this.InsertTaskDocument(cn, docs.TareaId, docs.DocumentoId);
        //    //        }

        //    //    }

        //    //}
        //    //catch (Exception )
        //    //{
        //    //    if (cn.State == ConnectionState.Open) { cn.Close(); }
        //    //    throw;
        //    //}

        //    //return result;
        //}

        //public imodel.ITarea DeleteTask(imodel.ITarea task)
        //{
        //    List<imodel.ITarea> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdTarea",task.ID }                       
        //        };
        //        result = helper.CreateEntities<imodel.ITarea>(USP_TAREA_DELETE, CommandType.StoredProcedure, parameters);                
        //        return result[0];
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //    //int result = 0;
        //    //SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString);
        //    //try
        //    //{
        //    //    SqlCommand cmd;
        //    //    ////if (task.DocumentosAgregados.Count > 0)
        //    //    ////{
        //    //    ////    DeleteTaskDocuments(cn, (int)task.ID);                  
        //    //    ////}
        //    //    string sqlQuery = @"UPDATE dbo.Tareas SET idEstatus=14
        //    //                            WHERE TareaId=@TareaId ";
        //    //    cmd = new SqlCommand(sqlQuery, cn);
        //    //    cmd.Parameters.Add("@TareaId", SqlDbType.Int).Value = task.ID;
        //    //    cn.Open();
        //    //    result = cmd.ExecuteNonQuery();
        //    //    cn.Close();               
        //    //}
        //    //catch (Exception )
        //    //{
        //    //    if (cn.State == ConnectionState.Open) { cn.Close(); }
        //    //    throw;
        //    //}

        //    //return result;
        //}

        //public int ChangeOrderTask(List<imodel.ITarea> tasks)
        //{
        //    List<imodel.ITarea> result = null;
        //    try
        //    {
        //        string tareas = "";
        //        foreach (var t in tasks)
        //        {
        //            tareas += t.ID + ",";
        //        }

        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "tareas",tareas}
        //            };
        //        result = helper.CreateEntities<imodel.ITarea>(USP_TAREA_REORDER, CommandType.StoredProcedure, parameters);
        //        return 1;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //    //int result = 0;
        //    //SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString);
        //    //try
        //    //{
        //    //    SqlCommand cmd;
        //    //    string sqlQuery = "";
        //    //    cn.Open();
        //    //    foreach (var task in tasks)
        //    //    {
        //    //        sqlQuery = @"UPDATE dbo.Tareas SET
        //    //                        Orden=@Orden
        //    //                            WHERE TareaId=@TareaId ";

        //    //        cmd = new SqlCommand(sqlQuery, cn);
        //    //        cmd.Parameters.Add("@TareaId", SqlDbType.Int).Value = task.ID;
        //    //        cmd.Parameters.Add("@Orden", SqlDbType.Int).Value = task.Orden;

        //    //        cmd.ExecuteNonQuery();
        //    //    }
        //    //    result = 1;
        //    //    cn.Close();
        //    //}
        //    //catch (Exception )
        //    //{
        //    //    if (cn.State == ConnectionState.Open) { cn.Close(); }
        //    //    throw;
        //    //}

        //    //return result;
        //}

        //public imodel.ITarea GetWorkflowTasksInfoNew(int idFlujo)
        //{
        //    List<imodel.ITarea> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdFlujo",idFlujo }
        //        };

        //        result = helper.CreateEntities<imodel.ITarea>(USP_TAREABASE_SELECT, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result[0];
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //    //Dictionary<string, object> parameters = null;
        //    //imodel.ITarea result = null;

        //    //try
        //    //{
        //    //    string sqlQuery = @"SELECT 0 as [ID], 
        //    //            FT.FlujoId,FT.Nombre as FlujoNombre, 7 as [DiasVigencia>,'' as [Descripcion],
        //    //            'Inicial' as [EstadoTarea],(select ISNULL(COUNT(TareaId) + 1,1) from dbo.tareas where FlujoId=FT.FlujoId) as [Orden],                        
        //    //            23 as [IdStatus],
        //    //            CS.Nombre as [StatusNombre],
        //    //            CA.Nombre as [AmbitoNombre],
        //    //            13 as [Estatus.ID],
        //    //            'Activo' as [Estatus.Nombre]
        //    //            FROM dbo.FlujoTrabajo FT 
        //    //            JOIN dbo.TipoFlujoTrabajo TFT ON(FT.IdTipo=TFT.Id)
        //    //            JOIN dbo.Usuarios UC ON(FT.CreadoPor = UC.Id) 
        //    //            JOIN dbo.Usuarios UM ON(FT.ModificadoPor = UM.Id) 
        //    //            JOIN dbo.CatalogosGeneralesValores CS ON(CS.Id= 23)
        //    //            JOIN dbo.CatalogosGeneralesValores CA ON(TFT.IdAmbito = CA.Id)                          
        //    //            WHERE FT.FlujoId=@idFlujo";

        //    //    parameters = new Dictionary<string, object>();
        //    //    parameters.Add("idFlujo", idFlujo);

        //    //    result = helper.CreateSingleEntity<imodel.ITarea>(sqlQuery, CommandType.Text, parameters);
        //    //}
        //    //catch (Exception)
        //    //{
        //    //    throw;
        //    //}
        //    //return result != null ? result : null;
        //}

        //public List<imodel.IItemGeneral> GetCommonDocuments(string search)
        //{         
        //    List<imodel.IItemGeneral> result = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "Nombre",search }
        //        };

        //        result = helper.CreateEntities<imodel.IItemGeneral>(USP_DOCUMENTOSCOMUNES_SELECT, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //}

        //public List<imodel.IItemGeneral> GetCommonDocuments()
        //{
        //    List<imodel.IItemGeneral> result = null;

        //    try
        //    {
        //        result = helper.CreateEntities<imodel.IItemGeneral>(USP_DOCUMENTOSCOMUNES_SELECT, CommandType.StoredProcedure);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public int InsertTaskDocument(int idTarea,int idDocumento)
        //{

        //    List<imodel.IItemGeneral> result = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "idTarea",idTarea },
        //                { "idDocumento",idDocumento }
        //        };

        //        result = helper.CreateEntities<imodel.IItemGeneral>(USP_DOCUMENTOSTAREA_INSERT, CommandType.StoredProcedure, parameters);

        //        return 1;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //    //int result = 0;            
        //    //try
        //    //{
        //    //    SqlCommand cmd;
        //    //    string sqlQuery = "";

        //    //    sqlQuery = "INSERT INTO dbo.DocumentosTarea(TareaId,DocumentoId) VALUES(@idTarea,@idDocumento)";
        //    //    cmd = new SqlCommand(sqlQuery, cn);                
        //    //    cmd.Parameters.Clear();
        //    //    cmd.Parameters.Add("@idTarea", SqlDbType.Int).Value = idTarea;
        //    //    cmd.Parameters.Add("@idDocumento", SqlDbType.Int).Value = idDocumento;
        //    //    cn.Open();
        //    //    result = cmd.ExecuteNonQuery();

        //    //    cn.Close();
        //    //}
        //    //catch (Exception )
        //    //{
        //    //    if (cn.State == ConnectionState.Open) { cn.Close(); }
        //    //    throw;
        //    //}
        //    //return result;
        //}

        //public int DeleteTaskDocuments( int idTarea)
        //{
        //    List<imodel.IItemGeneral> result = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "idTarea",idTarea }
        //        };

        //        result = helper.CreateEntities<imodel.IItemGeneral>(USP_DOCUMENTOSTAREA_DELETE, CommandType.StoredProcedure, parameters);

        //        return 1;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //    //int result = 0;

        //    //try
        //    //{
        //    //    SqlCommand cmd;
        //    //    string sqlQuery = "";
        //    //    sqlQuery = "DELETE FROM dbo.DocumentosTarea WHERE TareaId=@idTarea";
        //    //    cmd = new SqlCommand(sqlQuery, cn);
        //    //    cmd.Parameters.Clear();
        //    //    cmd.Parameters.Add("@idTarea", SqlDbType.Int).Value = idTarea;
        //    //    cn.Open();
        //    //    cmd.ExecuteNonQuery();

        //    //    cn.Close();
        //    //}
        //    //catch (Exception )
        //    //{
        //    //    if (cn.State == ConnectionState.Open) { cn.Close(); }
        //    //    throw;
        //    //}
        //    //return result;
        //}

        //#region Asignados
        //public List<imodel.ITareaAsignado> GetTaskAssignedByTask(int IdTarea)
        //{
        //    List<imodel.ITareaAsignado> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {{ "IdTarea",IdTarea },
        //            { "IdFlujo",DBNull.Value }};
        //        result = helper.CreateEntities<imodel.ITareaAsignado>(USP_ASIGNADOS_SELECT, CommandType.StoredProcedure, parameters);
        //        return result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public List<imodel.ITareaAsignado> GetTaskAssignedByWorkflow(int IdFlujo)
        //{
        //    List<imodel.ITareaAsignado> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {{ "IdTarea",DBNull.Value },
        //            { "IdFlujo",IdFlujo }};
        //        result = helper.CreateEntities<imodel.ITareaAsignado>(USP_ASIGNADOS_SELECT, CommandType.StoredProcedure, parameters);
        //        return result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public List<imodel.IUsuario> GetUsersAssignedByTask(int IdTarea)
        //{
        //    List<imodel.IUsuario> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdTarea",IdTarea }
        //        };

        //        result = helper.CreateEntities<imodel.IUsuario>(USP_USUARIOSASIGNADOS_SELECT, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        //public List<imodel.ITareaAsignado> GetPossibleAssignUsers(string search)
        //{
        //    List<imodel.ITareaAsignado> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "Filtro",search },
        //                { "ClaveEstatus","A" }
        //        };

        //        result = helper.CreateEntities<imodel.ITareaAsignado>(USP_ASIGNADOS_SEARCH, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public bool SaveTaskAssignedUser(int IdTarea, int AsignadoId, string Tipo)
        //{
        //    try
        //    {
        //        var sTipo = Tipo.Substring(0, 1);
        //        string Field = sTipo == "U" ? "IdUsuario" : "IdNivel";
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdTarea",IdTarea },
        //                { Field, AsignadoId},
        //                { "Tipo",Tipo}
        //        };

        //        helper.CreateEntities<imodel.ITareaAsignado>(USP_ASIGNADOS_INSERT, CommandType.StoredProcedure, parameters);

        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public bool DeleteTaskAssignedUser(int IdTarea)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //            {
        //                { "IdTarea",IdTarea }
        //        };

        //        helper.CreateEntities<imodel.IWorkflow>(USP_ASIGNADOS_DELETE, CommandType.StoredProcedure, parameters);

        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
        //#endregion
    }
}
