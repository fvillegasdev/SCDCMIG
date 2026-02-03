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
//namespace EK.Datos.Kontrol.Sybase
//{
//    public class TareaInstance : idata.ITareaInstance
//    {
//        private const string USP_DOCUMENTOSTAREAINSTANCIA_SELECT = "{call usp_documentostareainstancia_select(?)}";
//        private const string USP_DOCUMENTOSTAREAINSTANCIA_INSERT = "{call usp_documentostareainstancia_insert(?,?,?,?,?,?)}";
//        private const string USP_DOCUMENTOSTAREAINSTANCIA_DELETE = "{call usp_documentostareainstancia_delete(?,?,?)}";
//        private const string USP_TAREAINSTANCIA_ENDTASK = "{call usp_tareainstancia_endtask(?,?,?,?,?,?,?)}";
//        private const string USP_TAREAINSTANCIA_SELECT = "{call usp_tareainstancia_select(?,?,?)}";
//        private const string USP_TAREAINSTANCIA_INSERT = "{call usp_tareainstancias_insert(?,?,?,?,?,?,?,?,?,?,?)}";
//        private const string USP_MISTAREAS_SELECT = "{call usp_mistareas_select(?,?)}";

//        private idata.IDBHelper helper;
//        public TareaInstance(imodel.IContainerFactory factory, idata.IDBHelper helper)
//        {
//            //this.helper = helper;
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }
//        public imodel.ITareaInstancia GetTaskInstanceByIdTask(int idTareaInstancia)
//        {
//            List<imodel.ITareaInstancia> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujoInstancia ",DBNull.Value },
//                        { "IdTareaInstancia ",idTareaInstancia },
//                        { "IdTareaInstanciaBase ",DBNull.Value }
//                };
//                result = helper.CreateEntities<imodel.ITareaInstancia>(USP_TAREAINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);

//                result[0].RefJSON = Newtonsoft.Json.JsonConvert.DeserializeObject(result[0].ReferenciaJSON);
//                return result.Count == 0 ? null : result[0];
//            }
//            catch (Exception)
//            {
//                throw;
//            }

//            ////Dictionary<string, object> parameters = null;
//            ////imodel.ITareaInstancia result = null;
//            ////try
//            ////{
//            ////    string sqlQuery = @"SELECT TI.TareaInstanciaId as [ID],
//            ////                        TI.FlujoTrabajoInstanciaId, FI.Nombre as [NombreFlujoInstancia],
//            ////                        TI.TareaId, T.Descripcion as [DescripcionTarea],TI.IdStatus,
//            ////                        TI.Descripcion,TI.Comentarios,TI.Creado,TI.Modificado,
//            ////                        TI.FechaAprobacion,TI.FechaAsignacion,TI.FechaVigencia,
//            ////                        TI.CreadoPor,TI.ModificadoPor,TI.AprobadoPor,
//            ////                        TI.Orden,TI.Estado as [EstadoStr],FI.Referencia,FI.Entidad,
//            ////                        cast(cast(TI.RV as bigint) as nvarchar)  as [Version],TI.IdEstatus,F.FlujoId,
//            ////                        UC.Id as [CreadoPor.ID],
//            ////                        UC.Nombre as [CreadoPor.Nombre],
//            ////                        UM.Id as [ModificadoPor.ID], 
//            ////                        UM.Nombre as [ModificadoPor.Nombre],
//            ////                        UA.Id as [AprobadoPor.ID], 
//            ////                        UA.Nombre as [AprobadoPor.Nombre],
//            ////                        CA.Id as [Ambito.ID], 
//            ////                        CA.Nombre as [Ambito.Nombre],
//            ////                        CS.Id as [Status.ID], 
//            ////                        CS.Nombre as [Status.Nombre],
//            ////                        CE.Id as [Estatus.ID],
//            ////                        CE.Nombre as [Estatus.Nombre]  
//            ////                        FROM dbo.tareaInstancias TI
//            ////                        JOIN dbo.Tareas T ON (T.TareaId=TI.TareaId)
//            ////                        JOIN dbo.FlujoTrabajoInstancia FI ON (FI.FlujoTrabajoInstanciaId=TI.FlujoTrabajoInstanciaId)
//            ////                        JOIN dbo.FlujoTrabajo F ON (F.FlujoId=FI.FlujoId)
//            ////                        JOIN dbo.CatalogosGeneralesValores CA ON(F.Ambito = CA.Id) 
//            ////                        JOIN dbo.CatalogosGeneralesValores CS ON(TI.IdStatus = CS.Id) 
//            ////                        LEFT JOIN dbo.Usuarios UC ON(TI.CreadoPor = UC.Id) 
//            ////                        LEFT JOIN dbo.Usuarios UM ON(TI.ModificadoPor = UM.Id) 
//            ////                        LEFT JOIN dbo.Usuarios UA ON(TI.AprobadoPor = UA.Id) 
//            ////                        JOIN dbo.CatalogosGeneralesValores CE ON(TI.idEstatus = CE.Id) 
//            ////                        WHERE TI.TareaInstanciaId=@idTareaInstancia";
//            ////    parameters = new Dictionary<string, object>();
//            ////    parameters.Add("idTareaInstancia", idTareaInstancia);
//            ////    result = helper.CreateSingleEntity<imodel.ITareaInstancia>(sqlQuery, CommandType.Text, parameters);
//            ////}
//            ////catch (Exception)
//            ////{
//            ////    throw;
//            ////}
//            ////return result != null ? result : null;
//        }

//        public List<imodel.ITareaInstanciaDocumentos> GetDocumentsByTaskInstance(int idTareaInstancia)
//        {
//            List<imodel.ITareaInstanciaDocumentos> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idTareaInstancia",idTareaInstancia }
//            };

//                result = helper.CreateEntities<imodel.ITareaInstanciaDocumentos>(USP_DOCUMENTOSTAREAINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result;
//            }
//            catch (Exception)
//            {

//                throw;
//            }



//            ////Dictionary<string, object> parameters = null;
//            ////List<imodel.ITareaInstanciaDocumentos> result = null;

//            ////try
//            ////{
//            ////    string sqlQuery = @"SELECT DTI.TareaInstanciaId,DTI.DocumentoId as [id],DTI.ArchivoId,DC.Nombre as [title],A.Nombre as [text],
//            ////                            (CASE WHEN DTI.DocumentoId=DT.DocumentoId THEN 'Si' ELSE 'No' END) as Obligatorio,
//            ////                            (CASE WHEN DTI.DocumentoId=DT.DocumentoId THEN 'No' ELSE 'Si' END) as [ShowDeleteButton]
//            ////                            FROM dbo.DocumentosTareaInstancia DTI
//            ////                            JOIN dbo.TareaInstancias TI ON(DTI.TareaInstanciaId=TI.TareaInstanciaId)
//            ////                            LEFT JOIN dbo.DocumentosTarea DT ON(DT.TareaId=TI.TareaId AND DT.DocumentoId=DTI.DocumentoId)
//            ////                            LEFT JOIN dbo.DocumentosComunes DC ON(DC.DocumentoId=DTI.DocumentoId)
//            ////                            LEFT JOIN dbo.Archivos A ON(DTI.ArchivoId=A.ArchivoId)
//            ////                            WHERE DTI.TareaInstanciaId=@idTareaInstancia
//            ////                        UNION
//            ////                        SELECT @idTareaInstancia as TareaInstanciaId,DT.DocumentoId as[id],0 as [ArchivoId],DC.Nombre as [title],'' as [text],
//            ////                            'Si' as Obligatorio,'No' as  [ShowDeleteButton]
//            ////                            FROM dbo.DocumentosTarea DT
//            ////                            JOIN dbo.TareaInstancias TI ON(DT.TareaId=TI.TareaId)
//            ////                            LEFT JOIN dbo.DocumentosComunes DC ON(DC.DocumentoId=DT.DocumentoId)
//            ////                            WHERE TI.TareaInstanciaId=@idTareaInstancia
//            ////                            and DT.DocumentoId not in(Select DocumentoId from dbo.DocumentosTareaInstancia
//            ////		where TareaInstanciaId=@IdTareaInstancia)
//            ////                        UNION
//            ////                        SELECT @idTareaInstancia as TareaInstanciaId,100 as[id],0 as [ArchivoId],'Inserte un nuevo archivo' as [title],'' as [text],
//            ////                            'No' as Obligatorio ,'Si' as  [ShowDeleteButton]";

//            ////    parameters = new Dictionary<string, object>();
//            ////    parameters.Add("idTareaInstancia", idTareaInstancia);

//            ////    result = helper.CreateEntities<imodel.ITareaInstanciaDocumentos>(sqlQuery, CommandType.Text, parameters);
//            ////}
//            ////catch (Exception)
//            ////{

//            ////    throw;
//            ////}

//            ////return result != null ? result : null;
//        }

//        public imodel.ITareaInstancia InsertTaskInstance(imodel.ITareaInstancia ti)
//        {

//            List<imodel.ITareaInstancia> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                   { "FlujoTrabajoInstanciaId",ti.FlujoTrabajoInstanciaId },
//                    { "TareaId",ti.TareaId },
//                    { "IdStatus",ti.IdStatus },
//                    { "Descripcion",ti.Descripcion },
//                    { "Comentarios",ti.Comentarios },
//                    { "FechaVigencia",ti.FechaVigencia },
//                    { "CreadoPor",ti.IdCreadoPor },
//                    { "ModificadoPor",ti.IdModificadoPor },
//                    { "Orden",ti.Orden },
//                    { "Estado",ti.EstadoStr },
//                    { "IdEstatus",ti.IdEstatus }
//            };

//                result = helper.CreateEntities<imodel.ITareaInstancia>(USP_TAREAINSTANCIA_INSERT, CommandType.StoredProcedure, parameters);
//                return result.Count == 0 ? null : result[0];
//            }
//            catch (Exception)
//            {
//                throw;
//            }

//            //var conn = ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString;
//            //Int32 FlujoInstanciaId = 0;            
//            //var query = @"INSERT INTO dbo.TareaInstancias(FlujoTrabajoInstanciaId,TareaId,IdStatus,
//            //                Descripcion,Comentarios,Creado,Modificado,FechaAsignacion,FechaVigencia,
//            //                CreadoPor,ModificadoPor,Orden,Estado,IdEstatus) 
//            //            VALUES(@FlujoTrabajoInstanciaId,@TareaId,@IdStatus,@Descripcion,@Comentarios,
//            //                GETUTCDATE(),GETUTCDATE(),GETUTCDATE(),@FechaVigencia,@CreadoPor,@ModificadoPor,
//            //                    @Orden,@Estado,@IdEstatus); 
//            //                       SELECT CAST(scope_identity() AS int)";
//            //using (var cn = new SqlConnection(conn))
//            //{
//            //    using (var cmd = new SqlCommand(query, cn))
//            //    {
//            //        cmd.Parameters.Add("@FlujoTrabajoInstanciaId", SqlDbType.Int).Value = ti.FlujoId;
//            //        cmd.Parameters.Add("@TareaId", SqlDbType.Int).Value = ti.TareaId;
//            //        cmd.Parameters.Add("@IdStatus", SqlDbType.Int).Value = ti.IdStatus;
//            //        cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar).Value = ti.Descripcion;
//            //        cmd.Parameters.Add("@Comentarios", SqlDbType.VarChar).Value = ti.Comentarios;
//            //        //cmd.Parameters.Add("@Creado", SqlDbType.DateTime).Value = ti.Creado;
//            //        //cmd.Parameters.Add("@Modificado", SqlDbType.DateTime).Value = ti.Modificado;
//            //        //cmd.Parameters.Add("@FechaAprobacion", SqlDbType.DateTime).Value = ti.FechaAprobacion;
//            //        //cmd.Parameters.Add("@FechaAsignacion", SqlDbType.DateTime).Value = ti.FechaAsignacion;
//            //        cmd.Parameters.Add("@FechaVigencia", SqlDbType.DateTime).Value = ti.FechaVigencia;
//            //        cmd.Parameters.Add("@CreadoPor", SqlDbType.Int).Value = ti.IdCreadoPor;
//            //        cmd.Parameters.Add("@ModificadoPor", SqlDbType.Int).Value = ti.IdModificadoPor;
//            //        //cmd.Parameters.Add("@AprobadoPor", SqlDbType.Int).Value = ti.IdAprobadoPor;
//            //        cmd.Parameters.Add("@Orden", SqlDbType.Int).Value = ti.Orden;
//            //        cmd.Parameters.Add("@Estado", SqlDbType.VarChar).Value = ti.EstadoStr;                                       
//            //        cmd.Parameters.Add("@IdEstatus", SqlDbType.Int).Value = ti.IdEstatus;                    
//            //        cn.Open();
//            //        FlujoInstanciaId = (Int32)cmd.ExecuteScalar();
//            //    }
//            //}
//            //return this.GetTaskInstanceByIdTask((int)FlujoInstanciaId);
//        }


//        #region "Proceso de Autorizacion de Tareas"        
//        public imodel.ITareaInstancia UpdateTaskInstance(imodel.ITareaInstancia ti)
//        {
//            List<imodel.ITareaInstancia> result = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "TareaInstanciaId",ti.ID },
//                    { "FlujoTrabajoInstanciaId", ti.FlujoTrabajoInstanciaId },
//                    { "IdStatus", ti.IdStatus },
//                    { "Comentarios", ti.Comentarios },
//                    { "ModificadoPor", ti.IdModificadoPor },
//                    { "AprobadoPor", ti.IdAprobadoPor },
//                    { "Estado", ti.EstadoStr }
//            };

//                result = helper.CreateEntities<imodel.ITareaInstancia>(USP_TAREAINSTANCIA_ENDTASK, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result[0];
//            }
//            catch (Exception)
//            {

//                throw;
//            }

//        }

//        public List<imodel.ITareaInstanciaDocumentos> InsertDocumentsTaskInstance(imodel.ITareaInstanciaDocumentos ti)
//        {
//            List<imodel.ITareaInstanciaDocumentos> result = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "TareaInstanciaId",ti.TareaInstanciaId },
//                    { "DocumentoId", ti.DocumentoId },
//                    { "ArchivoId", ti.ArchivoId },
//                    { "Obligatorio", (ti.Obligatorio=="Si"?1:0) },
//                    { "Referencia", ti.Referencia },
//                    { "Nombre", ti.text }

//            };

//                result = helper.CreateEntities<imodel.ITareaInstanciaDocumentos>(USP_DOCUMENTOSTAREAINSTANCIA_INSERT, CommandType.StoredProcedure, parameters);

//                return this.GetDocumentsByTaskInstance(ti.TareaInstanciaId);
//            }
//            catch (Exception)
//            {

//                throw;
//            }

//        }

//        public List<imodel.ITareaInstanciaDocumentos> DeleteDocumentsTaskInstance(imodel.ITareaInstanciaDocumentos ti)
//        {
//            List<imodel.ITareaInstanciaDocumentos> result = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "TareaInstanciaId",ti.TareaInstanciaId },
//                    { "DocumentoId", ti.DocumentoId },
//                    { "ArchivoId", ti.ArchivoId }
//                };

//                result = helper.CreateEntities<imodel.ITareaInstanciaDocumentos>(USP_DOCUMENTOSTAREAINSTANCIA_DELETE, CommandType.StoredProcedure, parameters);

//                return this.GetDocumentsByTaskInstance(ti.TareaInstanciaId);
//            }
//            catch (Exception)
//            {

//                throw;
//            }

//        }
//        #endregion

//        #region MisTareas
//        public List<imodel.ITareaInstancia> GetMyTasks(int IdUsuario,int IdTipoConsulta)
//        {
//            List<imodel.ITareaInstancia> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>();
//                parameters.Add("IdUsuario ", IdUsuario);
//                switch (IdTipoConsulta)
//                {
//                    case 1://Asignados a mi                        
//                        parameters.Add("FiltroStatus ", DBNull.Value);
//                        break;
//                    case 2://Aprobadas                        
//                        parameters.Add("FiltroStatus ", "AP");
//                        break;
//                    case 3://Rechazadas                        
//                        parameters.Add("FiltroStatus ", "RE");
//                        break;
//                }

//                result = helper.CreateEntities<imodel.ITareaInstancia>(USP_MISTAREAS_SELECT, CommandType.StoredProcedure, parameters);
//                return result.Count == 0 ? null : result;
//            }
//            catch (Exception)
//            {
//                throw;
//            }           
//        }
//        #endregion
//    }
//}
