//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using idata = EK.Datos.Kontrol.Interfaces;
//using imodel = EK.Modelo.Kontrol.Interfaces;
//using model = EK.Modelo.Kontrol;
//using Newtonsoft.Json;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Workflow : 
//        DAOBase, idata.IWorkflow
//    {
//        private const string USP_FLUJOTRABAJO_SELECT = "{call usp_flujotrabajo_select(?,?,?,?)}";        
//        private const string USP_FLUJOTRABAJO_INSERT = "{call usp_flujotrabajo_insert(?,?,?,?,?,?,?,?)}";
//        private const string USP_FLUJOTRABAJO_UPDATE = "{call usp_flujotrabajo_update(?,?,?,?,?,?,?,?,?,?,?)}";
//        private const string USP_TAREA_SELECT = "{call usp_tarea_select(?,?,?)}";
//        private const string USP_NOTIFICADORES_SELECT = "{call usp_notificadores_select(?)}";
//        private const string USP_NOTIFICADORES_SEARCH = "{call usp_notificadores_search(?,?)}";
//        private const string USP_NOTIFICADORES_INSERT = "{call usp_notificadores_insert(?,?,?,?)}";
//        private const string USP_NOTIFICADORES_DELETE = "{call usp_notificadores_delete(?)}";
//        private const string USP_USUARIOSNOTIFICADORES_SELECT = "{call usp_notificadoresusuarios_select(?)}";

//        public Workflow(imodel.IContainerFactory factory,idata.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }
//        public List<imodel.IWorkflow> GetWorkflowsList(int idTipo)
//        {
//            List<imodel.IWorkflow> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "idTipo", idTipo }
//                };

//                result = helper.CreateEntities<imodel.IWorkflow>(USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }
//        public List<imodel.IWorkflow> GetWorkflowsByIdUser(int IdUser)
//        {
//            List<imodel.IWorkflow> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                    { "Id",DBNull.Value },
//                        { "ClaveTipo",DBNull.Value },
//                        { "ClaveFlujo",DBNull.Value },
//                        { "ClaveStatus",DBNull.Value},
//                        { "IdUsuario",IdUser }
//                };
//                result = helper.CreateEntities<imodel.IWorkflow>(USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure,parameters);
//                return result.Count == 0 ? null : result;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public imodel.IWorkflow GetWorkflowById(int id)
//        {
//            List<imodel.IWorkflow> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                    { "Id",id },
//                        { "ClaveTipo",DBNull.Value },
//                        { "ClaveFlujo",DBNull.Value },
//                        { "ClaveStatus",DBNull.Value},
//                        { "IdUsuario",DBNull.Value }
//                };

//                result = helper.CreateEntities<imodel.IWorkflow>(USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure,parameters);

//                return result.Count == 0 ? null : result[0];
//            }
//            catch (Exception)
//            {

//                throw;
//            }
//            ////Dictionary<string, object> parameters = null;
//            ////imodel.IWorkflow result = null;

//            ////try
//            ////{
//            ////    string sqlQuery = @"SELECT F.FlujoId as [ID],F.Nombre,F.Alias, 
//            ////                F.Creado,F.Modificado, 
//            ////                F.CreadoPor,
//            ////                F.ModificadoPor, 
//            ////                F.Ambito as [IdAmbito], 
//            ////                F.Entidad as [IdEntidad], 
//            ////                F.IdEstatus,F.Automatico,
//            ////                UC.Id as [CreadoPor.ID],
//            ////                UC.Nombre as [CreadoPor.Nombre],
//            ////                UM.Id as [ModificadoPor.ID], 
//            ////                UM.Nombre as [ModificadoPor.Nombre],
//            ////                CA.Id as [Ambito.ID], 
//            ////                CA.Nombre as [Ambito.Nombre],
//            ////                CE.Id as [Entidad.ID], 
//            ////                CE.Nombre as [Entidad.Nombre],
//            ////                CEst.Id as [Estatus.ID], 
//            ////                CEst.Nombre as [Estatus.Nombre],
//            ////                RV = cast(cast(F.RV as bigint) as nvarchar) 
//            ////            FROM dbo.FlujoTrabajo F 
//            ////            JOIN dbo.CatalogosGeneralesValores CA ON(F.Ambito = CA.Id) 
//            ////            JOIN dbo.CatalogosGeneralesValores CE ON(F.Entidad = CE.Id) 
//            ////            JOIN dbo.CatalogosGeneralesValores CEst ON(F.IdEstatus = CEst.Id) 
//            ////            LEFT JOIN dbo.Usuarios UC ON(F.CreadoPor = UC.Id) 
//            ////            LEFT JOIN dbo.Usuarios UM ON(F.ModificadoPor = UM.Id) 
//            ////            WHERE F.FlujoId = @Id
//            ////            ORDER BY F.FlujoId ASC";

//            ////    parameters = new Dictionary<string, object>();
//            ////    parameters.Add("Id", id);                                

//            ////    result = helper.CreateSingleEntity<model.Interfaces.IWorkflow>(sqlQuery, CommandType.Text, parameters);

//            ////}
//            ////catch (Exception)
//            ////{

//            ////    throw;
//            ////}

//            ////return result != null ? result : null;
//        }

//        public imodel.IWorkflow GetWorkflowByKey(string TypeKey)
//        {
//            imodel.IWorkflow result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "Id",DBNull.Value },
//                        { "ClaveTipo",TypeKey },                        
//                        { "ClaveStatus","A"},
//                        { "IdUsuario",DBNull.Value }                       
//                };

//                result = helper.CreateSingleEntity<imodel.IWorkflow>(USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure,parameters);

//                return result;
//            }
//            catch (Exception)
//            {

//                throw;
//            }
//        }

//        public List<imodel.ITarea> GetTasksByWorkflow(int idFlujo)
//        {
//            List<imodel.ITarea> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",idFlujo },
//                        { "ClaveStatus","A"}
//                };

//                result = helper.CreateEntities<imodel.ITarea>(USP_TAREA_SELECT, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result;
//            }
//            catch (Exception)
//            {

//                throw;
//            }

//            ////Dictionary<string, object> parameters = null;
//            ////List<imodel.ITarea> result = null;

//            ////try
//            ////{
//            ////    string sqlQuery = @"SELECT T.TareaId as [ID], 
//            ////            T.FlujoId, T.DiasVigencia,T.Descripcion,
//            ////            T.Estado as [EstadoTarea],T.Creado,T.Modificado,T.Orden, 
//            ////            T.CreadoPor,
//            ////            T.ModificadoPor,
//            ////            T.IdStatus as [IdStatus],
//            ////            T.IdEstatus,
//            ////            CS.Nombre as [StatusNombre], 
//            ////            UC.Id as [CreadoPor.Id],
//            ////            UC.Nombre as [CreadoPor.Nombre],
//            ////            UM.Id as [ModificadoPor.Id], 
//            ////            UM.Nombre as [ModificadoPor.Nombre],
//            ////            Version = cast(cast(T.RV as bigint) as nvarchar),
//            ////            CA.Nombre as [AmbitoNombre],
//            ////            CE.Id as [Estatus.ID],
//            ////            CE.Nombre as [Estatus.Nombre] 
//            ////            FROM dbo.Tareas T 
//            ////            JOIN dbo.FlujoTrabajo FT ON(T.FlujoId=FT.FlujoId)
//            ////            JOIN dbo.TipoFlujoTrabajo TFT ON(FT.IdTipo=TFT.Id)
//            ////            JOIN dbo.Usuarios UC ON(T.CreadoPor = UC.Id) 
//            ////            JOIN dbo.Usuarios UM ON(T.ModificadoPor = UM.Id) 
//            ////            JOIN dbo.CatalogosGeneralesValores CS ON(T.IdStatus = CS.Id) 
//            ////            JOIN dbo.CatalogosGeneralesValores CA ON(TFT.IdAmbito = CA.Id) 
//            ////            JOIN dbo.CatalogosGeneralesValores CE ON(T.idEstatus = CE.Id)   
//            ////            WHERE T.FlujoId= @idFlujo AND CE.Clave='A'
//            ////            ORDER BY T.Orden ASC";

//            ////    parameters = new Dictionary<string, object>();
//            ////    parameters.Add("idFlujo", idFlujo);                

//            ////    result = helper.CreateEntities<imodel.ITarea>(sqlQuery, CommandType.Text, parameters);
//            ////}
//            ////catch (Exception)
//            ////{
//            ////    throw;
//            ////}

//            ////return result != null ? result : null;
//        }

//        public List<imodel.INotificador> GetNotifiersByWorkflow(int idFlujo)
//        {
//            List<imodel.INotificador> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",idFlujo }
//                };

//                result = helper.CreateEntities<imodel.INotificador>(USP_NOTIFICADORES_SELECT, CommandType.StoredProcedure, parameters);

//                return result;
//            }
//            catch (Exception)
//            {

//                throw;
//            }      
//        }

//        public List<imodel.IUsuario> GetUsersNotifiersByWorkflow(int idFlujo)
//        {
//            List<imodel.IUsuario> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",idFlujo }
//                };

//                result = helper.CreateEntities<imodel.IUsuario>(USP_USUARIOSNOTIFICADORES_SELECT, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result;
//            }
//            catch (Exception)
//            {

//                throw;
//            }
//        }

//        public List<imodel.INotificador> GetPossibleNotificators(string search)
//        {
//            List<imodel.INotificador> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "Filtro",search },
//                        { "ClaveEstatus","A" }
//                };

//                result = helper.CreateEntities<imodel.INotificador>(USP_NOTIFICADORES_SEARCH, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
 
//        }

//        public imodel.IWorkflow SaveWorkflow(imodel.IWorkflow wf)
//        {
//            List<imodel.IWorkflow> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",wf.ID },
//                        { "Nombre",wf.Nombre },
//                        { "Alias",wf.Alias },
//                        { "CreadoPor",wf.IdCreadoPor },
//                        { "ModificadoPor",wf.IdModificadoPor },
//                        { "IdTipo",wf.IdTipo }
//                };

//                result = helper.CreateEntities<imodel.IWorkflow>(USP_FLUJOTRABAJO_INSERT, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result[0];
//            }
//            catch (Exception)
//            {
//                throw;
//            }
         
//        }

//        public imodel.IWorkflow UpdateWorkflow(imodel.IWorkflow wf)
//        {
//            List<imodel.IWorkflow> result = null;
//            try
//            {
//                var strNiveles = "";
//                var strUsuarios = "";

//                if (strNiveles.Length > 0) { strNiveles=strNiveles.Remove(strNiveles.Length - 1); }
//                if (strUsuarios.Length > 0) { strUsuarios = strUsuarios.Remove(strUsuarios.Length - 1); }
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",wf.ID },
//                        { "Nombre",wf.Nombre },
//                        { "Alias",wf.Alias },
//                        { "CreadoPor",wf.IdCreadoPor },
//                        { "ModificadoPor",wf.IdModificadoPor },
//                        { "IdTipo",wf.IdTipo },
//                        { "IdEstatus",wf.IdEstatus },
//                        { "NotificadoresNivel",strNiveles },
//                        { "NotificadoresUsuario",strUsuarios }
//                };

//                result = helper.CreateEntities<imodel.IWorkflow>(USP_FLUJOTRABAJO_UPDATE, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result[0];
//            }
//            catch (Exception)
//            {
//                throw;
//            }               
//        }

//        public bool SaveNotifierWorkflow(int FlujoId, int NotificadorId, string Tipo)
//        {            
//            try
//            {
//                var sTipo = Tipo.Substring(0, 1);
//                string Field = sTipo == "U" ? "IdUsuario" : "IdNivel";
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",FlujoId },
//                        { Field, NotificadorId},
//                        { "Tipo",Tipo}
//                };

//                helper.CreateEntities<imodel.IWorkflow>(USP_NOTIFICADORES_INSERT, CommandType.StoredProcedure, parameters);

//                return true;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//                //var conn = ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString;
//                //var query = "";
//                //var sTipo = Tipo.Substring(0, 1);

//            //    if (sTipo == "U")
//            //{
//            //    query = "INSERT INTO dbo.Notificadores(FlujoId,NotificadorId,Tipo) " +
//            //     " VALUES(@FlujoId,@NotificadorId,@Tipo); ";
//            //}
//            //else
//            //{
//            //    query = "INSERT INTO dbo.Notificadores(FlujoId,NivelNotificadorId,Tipo) " +
//            //     " VALUES(@FlujoId,@NivelNotificadorId,@Tipo); ";
//            //}               
//            //using (var cn = new SqlConnection(conn))
//            //{
//            //    using (var cmd = new SqlCommand(query, cn))
//            //    {
//            //        cmd.Parameters.Add("@FlujoId", SqlDbType.Int).Value = FlujoId;
//            //        if (sTipo == "U")
//            //        {
//            //            cmd.Parameters.Add("@NotificadorId", SqlDbType.Int).Value = NotificadorId;
//            //        }
//            //        else
//            //        {
//            //            cmd.Parameters.Add("@NivelNotificadorId", SqlDbType.Int).Value = NotificadorId;
//            //        }                                       
//            //        cmd.Parameters.Add("@Tipo", SqlDbType.VarChar).Value = sTipo;

//            //        cn.Open();

//            //        cmd.ExecuteNonQuery();
//            //    }
//            //}

//            //return true;
//        }

//        public bool DeleteNotifierWorkflow(int FlujoId)
//        {
//            try
//            {                                
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",FlujoId }
//                };

//                helper.CreateEntities<imodel.IWorkflow>(USP_NOTIFICADORES_DELETE, CommandType.StoredProcedure, parameters);

//                return true;
//            }
//            catch (Exception)
//            {
//                throw;
//            }

//            //var conn = ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString;

//            //var query = "";
//            //    query = "DELETE FROM dbo.Notificadores WHERE FlujoId=@FlujoId";


//            //using (var cn = new SqlConnection(conn))
//            //{
//            //    using (var cmd = new SqlCommand(query, cn))
//            //    {
//            //        cmd.Parameters.Add("@FlujoId", SqlDbType.Int).Value = FlujoId;                                  

//            //        cn.Open();

//            //        cmd.ExecuteNonQuery();
//            //    }
//            //}

//            //return true;
//        }

//        //FUNCION DEL PROCESO DE GENERACION DE WORKFLOWS******************************
//        public bool ValidateWorkflowDuplicity(int Entidad)
//        {
//            Dictionary<string, object> parameters = null;
//            List<imodel.IWorkflow> result = null;

//            try
//            {
//                string sqlQuery = @"SELECT F.FlujoId as [ID],F.Nombre,F.Alias, 
//                            F.Creado,F.Modificado, 
//                            F.CreadoPor,
//                            F.ModificadoPor, 
//                            TF.IdAmbito as [IdAmbito], 
//                            F.Entidad as [IdEntidad], 
//                            F.IdEstatus,F.Automatico
//                        FROM dbo.FlujoTrabajo F    
//                        JOIN dbo.TipoFlujoTrabajo TF ON(F.IdTipo=TF.Id)               
//                        JOIN dbo.CatalogosGeneralesValores CEst ON(F.IdEstatus = CEst.Id) 
//                        WHERE Entidad=@Entidad and CEst.Clave='A'";

//                parameters = new Dictionary<string, object>();
//                parameters.Add("Entidad", Entidad);

//                result = helper.CreateEntities<model.Interfaces.IWorkflow>(sqlQuery, CommandType.Text, parameters);

//            }
//            catch (Exception)
//            {

//                throw;
//            }

//            return (result.Count>1 || result==null) ? true : false;
//        }


//        public imodel.ITarea GetWorkflowTasksById(int idTarea)
//        {
//            List<imodel.ITarea> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",DBNull.Value },
//                        { "ClaveStatus","A" },
//                        { "IdTarea",idTarea }
//                };

//                result = helper.CreateEntities<imodel.ITarea>(USP_TAREA_SELECT, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result[0];
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//            //Dictionary<string, object> parameters = null;
//            //imodel.ITarea result = null;

//            //try
//            //{
//            //    string sqlQuery = @"SELECT T.TareaId as [ID], 
//            //            T.FlujoId,FT.Nombre as FlujoNombre, T.DiasVigencia,T.Descripcion,
//            //            T.Estado as [EstadoTarea],T.Creado,T.Modificado,T.Orden, 
//            //            T.CreadoPor as [IdCreadoPor],
//            //            T.ModificadoPor as [IdModificadoPor],
//            //            T.IdStatus as [IdStatus],
//            //            CS.Nombre as [StatusNombre], 
//            //            UC.Id as [CreadoPor.Id],
//            //            UC.Nombre as [CreadoPor.Nombre],
//            //            UM.Id as [ModificadoPor.Id], 
//            //            UM.Nombre as [ModificadoPor.Nombre],
//            //            Version = cast(cast(T.RV as bigint) as nvarchar),
//            //            CA.Nombre as [AmbitoNombre],
//            //            CE.Id as [Estatus.ID],
//            //            CE.Nombre as [Estatus.Nombre]  
//            //            FROM dbo.Tareas T 
//            //            JOIN dbo.FlujoTrabajo FT ON(T.FlujoId=FT.FlujoId)
//            //            JOIN dbo.TipoFlujoTrabajo TFT ON(FT.IdTipo=TFT.Id)
//            //            JOIN dbo.Usuarios UC ON(T.CreadoPor = UC.Id) 
//            //            JOIN dbo.Usuarios UM ON(T.ModificadoPor = UM.Id) 
//            //            JOIN dbo.CatalogosGeneralesValores CS ON(T.IdStatus = CS.Id)
//            //            JOIN dbo.CatalogosGeneralesValores CA ON(TFT.IdAmbito = CA.Id)  
//            //            JOIN dbo.CatalogosGeneralesValores CE ON(T.idEstatus = CE.Id)  
//            //            WHERE T.TareaID= @idTarea and T.idEstatus=13
//            //            ORDER BY T.Orden ASC";

//            //    parameters = new Dictionary<string, object>();
//            //    parameters.Add("idTarea", idTarea);

//            //    result = helper.CreateSingleEntity<imodel.ITarea>(sqlQuery, CommandType.Text, parameters);
//            //}
//            //catch (Exception)
//            //{

//            //    throw;
//            //}

//            //return result != null ? result : null;
//        }


//    }
//}
