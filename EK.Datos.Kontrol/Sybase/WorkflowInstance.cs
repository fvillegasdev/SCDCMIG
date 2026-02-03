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
//    public class WorkflowInstance:idata.IWorkflowInstance
//    {
//        private const string USP_FLUJOTRABAJOINSTANCIA_SELECT = "{call usp_flujotrabajoinstancia_select(?,?,?,?,?)}";
//        private const string USP_FLUJOTRABAJOINSTANCIA_INSERT = "{call usp_flujotrabajoinstancia_insert(?,?,?,?,?,?,?,?,?,?)}";
//        private const string USP_FLUJOTRABAJOINSTANCIA_UPDATE = "{call usp_flujotrabajoinstancia_update(?,?,?,?,?,?,?,?,?)}";
//        private const string USP_FLUJOTRABAJOINSTANCIA_CANCEL = "{call usp_flujotrabajoinstancia_cancel(?,?)}";
//        private const string USP_TAREAINSTANCIA_SELECT = "{call usp_tareainstancia_select(?,?,?)}";
//        private const string USP_MISPROCESOS_SELECT = "{call usp_misprocesos_select(?,?,?)}";

//        private idata.IDBHelper helper;

//        public WorkflowInstance(imodel.IContainerFactory factory, idata.IDBHelper helper)
//        {
//            //this.helper = helper;
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }
//        public List<imodel.IWorkflowInstance> GetWorkflowInstancesList(int idFlujo)
//        {
//            List<imodel.IWorkflowInstance> result = null;
//            try
//            {
//                int? FlujoId = 0;
//                if (idFlujo == 0) { FlujoId = null; } else { FlujoId = idFlujo; };

//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",FlujoId },
//                        { "IdFlujoInstancia",DBNull.Value },
//                        { "Clave",DBNull.Value },
//                        { "Referencia",DBNull.Value },
//                        { "OcultarFinalizados",0 }
//                };
//                result = helper.CreateEntities<imodel.IWorkflowInstance>(USP_FLUJOTRABAJOINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);

//                foreach (var item in result)
//                {
//                    item.RefJSON = Newtonsoft.Json.JsonConvert.DeserializeObject(item.ReferenciaJSON);
//                }
//                return result == null ? null : result;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public imodel.IWorkflowInstance GetWorkflowInstancebyId(int idInstancia)
//        {
//            List<imodel.IWorkflowInstance> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujo",DBNull.Value },
//                        { "IdFlujoInstancia",idInstancia },
//                        { "Clave",DBNull.Value },
//                        { "Referencia",DBNull.Value },
//                        { "OcultarFinalizados",0 }
//                };
//                result = helper.CreateEntities<imodel.IWorkflowInstance>(USP_FLUJOTRABAJOINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);
//                foreach (var item in result)
//                {
//                    item.RefJSON = Newtonsoft.Json.JsonConvert.DeserializeObject(item.ReferenciaJSON);
//                }
//                return result == null ? null : result[0];
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public List<imodel.ITareaInstancia> GetTaskInstancesByWorkflowInstance(int idFlujoInstancia)
//        {
//            List<imodel.ITareaInstancia> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdFlujoInstancia",idFlujoInstancia },                    
//                        { "IdTareaInstancia ",DBNull.Value },
//                        { "IdTareaInstanciaBase ",DBNull.Value }
//                };
//                result = helper.CreateEntities<imodel.ITareaInstancia>(USP_TAREAINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);
//                return result.Count == 0 ? null : result;
//            }
//            catch (Exception)
//            {
//                throw;
//            }

//            //Dictionary<string, object> parameters = null;
//            //List<imodel.ITareaInstancia> result = null;

//            //try
//            //{
//            //    string sqlQuery = @"SELECT TI.TareaInstanciaId as [ID],FTI.FlujoId,TI.FlujoTrabajoInstanciaId,FTI.Nombre as [NombreFlujoInstancia],
//            //                        TI.TareaId,TI.IdStatus,TI.Descripcion,TI.Comentarios,
//            //                        TI.Creado,TI.Modificado,TI.FechaAprobacion,TI.FechaAsignacion,TI.FechaVigencia,TI.CreadoPor,
//            //                        TI.ModificadoPor,TI.AprobadoPor as [IdAprobadoPor],TI.Orden,TI.Estado as [EstadoStr],                                    
//            //                        CS.Id as [Status.Id], 
//            //                        CS.Nombre as [Status.Nombre], 
//            //                        UC.Id as [CreadoPor.Id],
//            //                        UC.Nombre as [CreadoPor.Nombre],
//            //                        UM.Id as [ModificadoPor.Id], 
//            //                        UM.Nombre as [ModificadoPor.Nombre],
//            //                        UA.Id as [AprobadoPor.Id], 
//            //                        UA.Nombre as [AprobadoPor.Nombre],
//            //                        CA.Id as [Ambito.ID], 
//            //                        CA.Nombre as [Ambito.Nombre] ,                                  
//            //                        Version = cast(cast(TI.RV as bigint) as nvarchar) 	
//            //                        FROM dbo.tareaInstancias TI
//            //                        JOIN dbo.FlujoTrabajoInstancia FTI ON(TI.FlujoTrabajoInstanciaId=FTI.FlujoTrabajoInstanciaId)
//            //                        JOIN dbo.FlujoTrabajo F ON (F.FlujoId=FTI.FlujoId)
//            //                        JOIN dbo.Usuarios UC ON(TI.CreadoPor = UC.Id) 
//            //                        JOIN dbo.Usuarios UM ON(TI.ModificadoPor = UM.Id) 
//            //                        LEFT JOIN dbo.Usuarios UA ON(TI.AprobadoPor = UA.Id) 
//            //                        LEFT JOIN dbo.CatalogosGeneralesValores CS ON(TI.IdStatus = CS.Id) 
//            //                        LEFT JOIN dbo.CatalogosGeneralesValores CA ON(F.Ambito = CA.Id) 
//            //                        WHERE TI.FlujoTrabajoInstanciaId=@idFlujoInstancia
//            //                        ORDER BY TI.Orden ASC";

//            //    parameters = new Dictionary<string, object>();
//            //    parameters.Add("idFlujoInstancia", idFlujoInstancia);

//            //    result = helper.CreateEntities<imodel.ITareaInstancia>(sqlQuery, CommandType.Text, parameters);
//            //}
//            //catch (Exception)
//            //{

//            //    throw;
//            //}

//            //return result != null ? result : null;
//        }

//        public imodel.IWorkflowInstance CancelWorkflowInstance(int IdInstancia)
//        {
//            List<imodel.IWorkflowInstance> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdInstancia",IdInstancia },
//                        { "IdStatus",DBNull.Value }
//                };
//                result = helper.CreateEntities<imodel.IWorkflowInstance>(USP_FLUJOTRABAJOINSTANCIA_CANCEL, CommandType.StoredProcedure, parameters);
//                return result == null ? null : result[0];
//            }
//            catch (Exception)
//            {
//                throw;
//            }
        
//        }

//        public int UpdateStatusWorkflowInstance(int IdInstancia, int IdStatus)
//        {
//            List<imodel.IWorkflowInstance> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "IdInstancia",IdInstancia },
//                        { "IdStatus",IdStatus }
//                };
//                result = helper.CreateEntities<imodel.IWorkflowInstance>(USP_FLUJOTRABAJOINSTANCIA_CANCEL, CommandType.StoredProcedure, parameters);
//                return 1;
//            }
//            catch (Exception)
//            {
//                throw;
//            }

//            //int result = 0;
//            //SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString);

//            //try
//            //{
//            //    SqlCommand cmd;
//            //    string sqlQuery = @"UPDATE dbo.flujotrabajoinstancia " +
//            //                         " SET IdStatus = @IdStatus  " +          
//            //                         " Where FlujoTrabajoInstanciaID =  @IdInstancia ";

//            //    cmd = new SqlCommand(sqlQuery, cn);
//            //    cmd.Parameters.Add("@IdInstancia", SqlDbType.Int).Value = IdInstancia;
//            //    cmd.Parameters.Add("@IdStatus", SqlDbType.Int).Value = IdStatus;

//            //    cn.Open();
//            //    result = cmd.ExecuteNonQuery();
//            //    cn.Close();
//            //}
//            //catch (Exception)
//            //{
//            //    if (cn.State == ConnectionState.Open) { cn.Close(); }
//            //    throw;
//            //}

//            //return result;
//        }

//        public imodel.IWorkflowReference GetWorkflowReferencebyIdInstance(int idInstancia)
//        {
//            //Dictionary<string, object> parameters = null;
//            imodel.IWorkflowReference result = null;

//            try
//            {
//                //string sqlQuery = @"";

//                //parameters = new Dictionary<string, object>();
//                //parameters.Add("Id", idInstancia);

//                //result = helper.CreateSingleEntity<model.Interfaces.IWorkflowInstance>(sqlQuery, CommandType.Text, parameters);

//                var Creador = new model.BaseUsuario()
//                {
//                    ID = 1,
//                    Nombre = "Administrador Global"
//                };

//                result = new model.WorkflowReference()
//                {
//                    ID = 2,
//                    IdTipo = model.TipoReferenciaEnum.Usuario,
//                    Tipo = model.TipoReferenciaEnum.Usuario.ToString(),
//                    Referencia = "5",
//                    CC = "004",
//                    Cliente = "Desarrollos Inmobiliarios García",
//                    Creado = DateTime.Now,
//                    CreadoPor = Creador
//                };

//            }
//            catch (Exception)
//            {
//                throw;
//            }

//            return result != null ? result : null;
//        }


//        public List<imodel.ITareaInstancia> GetTaskInstancesByTaskInWorkflow(int IdTareaInstancia)
//        {
//            List<imodel.ITareaInstancia> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {                        
//                        { "IdFlujoInstancia ",DBNull.Value },
//                        { "IdTareaInstancia ",DBNull.Value },
//                        { "IdTareaInstanciaBase ",IdTareaInstancia }
//                };
//                result = helper.CreateEntities<imodel.ITareaInstancia>(USP_TAREAINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);
//                return result.Count == 0 ? null : result;
//            }
//            catch (Exception)
//            {
//                throw;
//            }

//            //Dictionary<string, object> parameters = null;
//            //List<imodel.ITareaInstancia> result = null;

//            //try
//            //{
//            //    string sqlQuery = @"SELECT TI.TareaInstanciaId as [ID],FTI.FlujoId,TI.FlujoTrabajoInstanciaId,FTI.Nombre as [NombreFlujoInstancia],
//            //                        TI.TareaId,TI.IdStatus,TI.Descripcion,TI.Comentarios,
//            //                        TI.Creado,TI.Modificado,TI.FechaAprobacion,TI.FechaAsignacion,TI.FechaVigencia,TI.CreadoPor,
//            //                        TI.ModificadoPor,TI.AprobadoPor as [IdAprobadoPor],TI.Orden,TI.Estado as [EstadoStr],                                    
//            //                        CS.Id as [Status.Id], 
//            //                        CS.Nombre as [Status.Nombre], 
//            //                        UC.Id as [CreadoPor.Id],
//            //                        UC.Nombre as [CreadoPor.Nombre],
//            //                        UM.Id as [ModificadoPor.Id], 
//            //                        UM.Nombre as [ModificadoPor.Nombre],
//            //                        UA.Id as [AprobadoPor.Id], 
//            //                        UA.Nombre as [AprobadoPor.Nombre],
//            //                        CA.Id as [Ambito.ID], 
//            //                        CA.Nombre as [Ambito.Nombre] ,                                  
//            //                        Version = cast(cast(TI.RV as bigint) as nvarchar) 	
//            //                        FROM dbo.tareaInstancias TI
//            //                        JOIN dbo.FlujoTrabajoInstancia FTI ON(TI.FlujoTrabajoInstanciaId=FTI.FlujoTrabajoInstanciaId)
//            //                        JOIN dbo.FlujoTrabajo F ON (F.FlujoId=FTI.FlujoId)
//            //                        JOIN dbo.Usuarios UC ON(TI.CreadoPor = UC.Id) 
//            //                        JOIN dbo.Usuarios UM ON(TI.ModificadoPor = UM.Id) 
//            //                        LEFT JOIN dbo.Usuarios UA ON(TI.AprobadoPor = UA.Id) 
//            //                        LEFT JOIN dbo.CatalogosGeneralesValores CS ON(TI.IdStatus = CS.Id) 
//            //                        LEFT JOIN dbo.CatalogosGeneralesValores CA ON(FTI.Ambito = CA.Id) 
//            //                        WHERE TI.FlujoTrabajoInstanciaId =(select x.FlujoTrabajoInstanciaId 
//            //                                            FROM dbo.tareaInstancias x 
//            //                                            where x.TareaInstanciaId=@IdTareaInstancia)
//            //                        ORDER BY TI.Orden ASC";

//            //    parameters = new Dictionary<string, object>();
//            //    parameters.Add("IdTareaInstancia", IdTareaInstancia);

//            //    result = helper.CreateEntities<imodel.ITareaInstancia>(sqlQuery, CommandType.Text, parameters);
//            //}
//            //catch (Exception)
//            //{

//            //    throw;
//            //}

//            //return result != null ? result : null;
//        }

//        public imodel.IWorkflowReference GetWorkflowReferencebyIdTaskInstance(int idTareaInstancia)
//        {
//            //Dictionary<string, object> parameters = null;
//            imodel.IWorkflowReference result = null;

//            try
//            {
//                //string sqlQuery = @"";

//                //parameters = new Dictionary<string, object>();
//                //parameters.Add("Id", idInstancia);

//                //result = helper.CreateSingleEntity<model.Interfaces.IWorkflowInstance>(sqlQuery, CommandType.Text, parameters);

//                var Creador = new model.BaseUsuario()
//                {
//                    ID = 1,
//                    Nombre = "Administrador Global"
//                };

//                result = new model.WorkflowReference()
//                {
//                    ID = 2,
//                    IdTipo = model.TipoReferenciaEnum.Usuario,
//                    Tipo = model.TipoReferenciaEnum.Usuario.ToString(),
//                    Referencia = "5",
//                    CC = "004",
//                    Cliente = "Desarrollos Inmobiliarios García",
//                    Creado = DateTime.Now,
//                    CreadoPor = Creador
//                };

//            }
//            catch (Exception)
//            {
//                throw;
//            }

//            return result != null ? result : null;
//        }
//        public imodel.IWorkflowInstance InsertWorkflowInstance(imodel.IWorkflowInstance wfi)
//        {
//            List<imodel.IWorkflowInstance> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "FlujoId",wfi.FlujoId },
//                        { "Nombre",wfi.Nombre},
//                        { "Alias",wfi.Alias},
//                        { "Estado",wfi.Estado.ToString()},
//                        { "Referencia",wfi.Referencia},
//                        { "ReferenciaJSON",wfi.ReferenciaJSON},
//                        { "CreadoPor",wfi.IdCreadoPor},
//                        { "ModificadoPor",wfi.IdModificadoPor},
//                        { "IdAmbito",wfi.IdAmbito},
//                        { "Automatico",wfi.Automatico}
//                };
//                result = helper.CreateEntities<imodel.IWorkflowInstance>(USP_FLUJOTRABAJOINSTANCIA_INSERT, CommandType.StoredProcedure, parameters);
//                return result[0];
//            }
//            catch
//            {
//                throw;
//            }

//            //var conn = ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString;
//            //Int32 FlujoInstanciaId = 0;
//            //var DateNow = DateTime.Now;
//            //var query = @"INSERT INTO dbo.FlujoTrabajoInstancia(FlujoId,Nombre,Alias,IdStatus,Estado,Referencia,Creado,
//            //                Modificado,CreadoPor,ModificadoPor,Ambito,Entidad,Automatico,IdEstatus) 
//            //            VALUES(@FlujoId, @Nombre, @Alias, @IdStatus, @Estado, @Referencia, GETUTCDATE(), GETUTCDATE(), 
//            //                    @CreadoPor, @ModificadoPor, @Ambito, @Entidad,@Automatico,@IdEstatus); " +
//            //                      " SELECT CAST(scope_identity() AS int)";

//            //using (var cn = new SqlConnection(conn))
//            //{
//            //    using (var cmd = new SqlCommand(query, cn))
//            //    {
//            //        try
//            //        {
//            //            cmd.Parameters.Add("@FlujoId", SqlDbType.Int).Value = wfi.FlujoId;
//            //            cmd.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = wfi.Nombre;
//            //            cmd.Parameters.Add("@Alias", SqlDbType.VarChar).Value = wfi.Alias;
//            //            cmd.Parameters.Add("@IdStatus", SqlDbType.Int).Value = wfi.IdStatus;
//            //            cmd.Parameters.Add("@Estado", SqlDbType.VarChar).Value = wfi.EstadoStr;
//            //            cmd.Parameters.Add("@Referencia", SqlDbType.VarChar).Value = wfi.Referencia;
//            //            //cmd.Parameters.Add("@Creado", SqlDbType.DateTime).Value = wfi.Creado;
//            //            //cmd.Parameters.Add("@Modificado", SqlDbType.DateTime).Value = wfi.Modificado;
//            //            cmd.Parameters.Add("@CreadoPor", SqlDbType.Int).Value = wfi.IdCreadoPor;
//            //            cmd.Parameters.Add("@ModificadoPor", SqlDbType.Int).Value = wfi.IdCreadoPor;
//            //            cmd.Parameters.Add("@Ambito", SqlDbType.Int).Value = wfi.IdAmbito;
//            //            cmd.Parameters.Add("@Entidad", SqlDbType.Int).Value = wfi.IdEntidad;
//            //            cmd.Parameters.Add("@Automatico", SqlDbType.Int).Value = wfi.Automatico;
//            //            cmd.Parameters.Add("@IdEstatus", SqlDbType.Int).Value = wfi.IdEstatus;
//            //            cn.Open();

//            //            FlujoInstanciaId = (Int32)cmd.ExecuteScalar();
//            //        }
//            //        catch (Exception ex)
//            //        {
//            //            Console.Write(ex.Message.ToString());
//            //            throw;
//            //        }

//            //    }
//            //}

//            //return this.GetWorkflowInstancebyId((int)FlujoInstanciaId);
//        }

//        public imodel.IWorkflowInstance UpdateWorkflowInstance(imodel.IWorkflowInstance wfi)
//        {
//            List<imodel.IWorkflowInstance> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "FlujoId",wfi.FlujoId },
//                        { "Nombre",wfi.Nombre},
//                        { "Alias",wfi.Alias},
//                        { "IdStatus",wfi.IdStatus },
//                        { "Estado",wfi.Estado},
//                        { "Referencia",wfi.Referencia},
//                        { "CreadoPor",wfi.CreadoPor},
//                        { "ModificadoPor",wfi.ModificadoPor},
//                        { "IdAmbito",wfi.IdAmbito},
//                        { "Automatico",wfi.Automatico}
//                };
//                result = helper.CreateEntities<imodel.IWorkflowInstance>(USP_FLUJOTRABAJOINSTANCIA_UPDATE, CommandType.StoredProcedure, parameters);
//                return result[0];
//            }
//            catch (Exception)
//            {
//                throw;
//            }

//            //var conn = ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString;
//            //var query = "";

//            //query = @"Update dbo.FlujoTrabajoInstancia SET 
//            //            FlujoId=@FlujoId,
//            //           Nombre=@Nombre,
//            //           Alias=@Alias,
//            //            IdStatus=@IdStatus,
//            //            Estado=@IdEstadoStr,
//            //            Referencia=@Referencia,
//            //           Modificado=GETUTCDATE(),
//            //           ModificadoPor=@ModificadoPor, 
//            //           Ambito=@Ambito, 
//            //           Entidad=@Entidad,
//            //            Automatico=@Automatico 
//            //        WHERE FlujoTrabajoInstanciaId=" + wfi.ID;

//            //using (var cn = new SqlConnection(conn))
//            //{
//            //    using (var cmd = new SqlCommand(query, cn))
//            //    {
//            //        cmd.Parameters.Add("@FlujoId", SqlDbType.Int).Value = wfi.FlujoId;
//            //        cmd.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = wfi.Nombre;
//            //        cmd.Parameters.Add("@Alias", SqlDbType.VarChar).Value = wfi.Alias;
//            //        cmd.Parameters.Add("@IdStatus", SqlDbType.Int).Value = wfi.IdStatus;
//            //        cmd.Parameters.Add("@Estado", SqlDbType.VarChar).Value = wfi.EstadoStr;
//            //        cmd.Parameters.Add("@Referencia", SqlDbType.VarChar).Value = wfi.Referencia;                    
//            //        cmd.Parameters.Add("@Modificado", SqlDbType.DateTime).Value = wfi.Modificado;                    
//            //        cmd.Parameters.Add("@ModificadoPor", SqlDbType.Int).Value = wfi.IdModificadoPor;
//            //        cmd.Parameters.Add("@Ambito", SqlDbType.Int).Value = wfi.IdAmbito;
//            //        cmd.Parameters.Add("@Entidad", SqlDbType.Int).Value = wfi.IdEntidad;
//            //        cmd.Parameters.Add("@Automatico", SqlDbType.Int).Value = wfi.Automatico;
//            //        cn.Open();
//            //        cmd.ExecuteNonQuery();
//            //    }
//            //}


//            //return this.GetWorkflowInstancebyId((int)wfi.ID);
//        }

//        #region MisProcesos
//        public List<imodel.IWorkflowInstance> GetMyProcess(int TipoConsulta,int IdUsuario, string FiltroStatus)
//        {
//            List<imodel.IWorkflowInstance> result = null;
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                switch (TipoConsulta)
//                {
//                    case 1: //Creados por mi
//                        parameters.Add("IdUsuario", DBNull.Value);
//                        parameters.Add("IdCreadoPor", IdUsuario);
//                        parameters.Add("FiltroStatus", DBNull.Value);                                               
//                    break;

//                    case 2:// Asignados a mi
//                        parameters.Add("IdUsuario", IdUsuario);
//                        parameters.Add("IdCreadoPor", DBNull.Value);
//                        parameters.Add("FiltroStatus", FiltroStatus);
//                        break;

//                    case 3: //EN los que participe
//                        parameters.Add("IdUsuario", IdUsuario);
//                        parameters.Add("IdCreadoPor", DBNull.Value);
//                        parameters.Add("FiltroStatus", FiltroStatus);
//                        break;

//                    case 4: //Aprobados
//                        parameters.Add("IdUsuario", IdUsuario);
//                        parameters.Add("IdCreadoPor", DBNull.Value);
//                        parameters.Add("FiltroStatus", FiltroStatus);
//                        break;

//                    case 5: //Cancelados
//                        parameters.Add("IdUsuario", IdUsuario);
//                        parameters.Add("IdCreadoPor", DBNull.Value);
//                        parameters.Add("FiltroStatus", FiltroStatus);
//                        break;
//                }

//                result = helper.CreateEntities<imodel.IWorkflowInstance>(USP_MISPROCESOS_SELECT, CommandType.StoredProcedure, parameters);
//                foreach (var item in result)
//                {
//                    item.RefJSON = Newtonsoft.Json.JsonConvert.DeserializeObject(item.ReferenciaJSON);
//                }

//                return result == null ? null : result;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }
//        #endregion
//    }
//}
