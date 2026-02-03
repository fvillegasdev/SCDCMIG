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
using Newtonsoft.Json;

namespace EK.Datos.Kontrol.MSSQL
{
    public class WorkflowManager
        : DAOBaseGeneric<m.Kontrol.Interfaces.IBaseKontrol>, d.Kontrol.Interfaces.IWorkflowManager
    {
        private const string USP_TAREA_SELECT = "usp_tarea_select";
        private const string USP_FLUJOTRABAJO_SELECT = "usp_flujotrabajo_select";
        private const string USP_FLUJOTRABAJOINSTANCIA_SELECT = "usp_flujotrabajoinstancia_select";
        private const string USP_USUARIOS_ASIGNACIONES = "usp_usuarios_asignaciones";

        public WorkflowManager(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper, 
                  USP_FLUJOTRABAJOINSTANCIA_SELECT, 
                  null,
                  "workflows")
        { }

        public async Task<object[]> GetAssignedTasks(int idUser) {
            object[] result = null;

            try
            {
                var parameters = new Dictionary<string, object>
                    {
                            { "IdUser",idUser}
                    };

                result = await helper.CreateEntitiesAsync(USP_USUARIOS_ASIGNACIONES, CommandType.StoredProcedure, parameters);

                return result;
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

        public async Task<m.Kontrol.Interfaces.IWorkflow> GetWorkflow(string clave)
        {
            m.Kontrol.Interfaces.IWorkflow result = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "clave", clave}
                };

                result = await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IWorkflow>(USP_FLUJOTRABAJO_SELECT, CommandType.StoredProcedure, parameters);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<m.Kontrol.Interfaces.IWorkflow> GetWorkflow(int id)
        {
            m.Kontrol.Interfaces.IWorkflow result = null;

            try
            {
                var parameters = new Dictionary<string, object>
                    {
                            { "id", id}
                    };

                result = await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IWorkflow>(USP_USUARIOS_ASIGNACIONES, CommandType.StoredProcedure, parameters);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //public async Task<m.Kontrol.Interfaces.IWorkflowInstance> SaveWorkflowInstance(m.Kontrol.Interfaces.IWorkflowInstance instance) {
        //    m.Kontrol.Interfaces.IWorkflowInstance result = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "ID", instance.ID},
        //            { "IdFlujo", instance.IdFlujo},
        //            { "Nombre", instance.Nombre},
        //            { "Clave", instance.Clave},
        //            { "EstadoWF", instance.EstadoWF},
        //            { "IdReferencia", instance.IdReferencia},
        //            { "IdModificadoPor", instance.IdModificadoPor},
        //            { "IdEstatus", instance.IdEstatus},
        //            { "Referencia", instance.Referencia},
        //            { "IdUserOwner", instance.IdUserOwner}
        //        };

        //        result = await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IWorkflowInstance>(USP_USUARIOS_ASIGNACIONES, CommandType.StoredProcedure, parameters);

        //        return result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public async Task<m.Kontrol.Interfaces.ITareaInstancia> SaveWorkflowInstanceTask(m.Kontrol.Interfaces.ITareaInstancia instance)
        //{
        //    m.Kontrol.Interfaces.ITareaInstancia result = null;

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "ID", instance.ID},
        //            { "IdInstancia", instance.IdInstancia},
        //            { "Nombre", instance.Nombre},
        //            { "Clave", instance.Clave},
        //            { "Comentarios", instance.Comentarios},
        //            { "FechaAprobacion", instance.FechaAprobacion},
        //            { "FechaAsignacion", instance.FechaAsignacion},
        //            { "FechaVigencia", instance.FechaVigencia},
        //            { "IdModificadoPor", instance.IdModificadoPor},
        //            { "IdCompletadoPor", instance.IdCompletadoPor},
        //            { "Orden", instance.Orden},
        //            { "IdEstatus", instance.IdEstatus},
        //            { "DiasVigencia", instance.DiasVigencia}
        //        };

        //        result = await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.ITareaInstancia>(USP_USUARIOS_ASIGNACIONES, CommandType.StoredProcedure, parameters);

        //        return result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        public async Task<List<m.Kontrol.Interfaces.ITarea>> GetWorkflowTasks(int idWorkflow) {
            List<m.Kontrol.Interfaces.ITarea> result = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idFlujo", idWorkflow}
                };

                result = await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.ITarea>(USP_TAREA_SELECT, CommandType.StoredProcedure, parameters);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //public WorkflowManager(idata.IDBHelper helper)
        //{
        //    this.helper = helper;

        //}


        //public List<imodel.IWorkflowInstance> GetWorkflowInstancebyReference(string TypeKey, string Reference, int OcultarFinalizados)
        //{
        //    List<imodel.IWorkflowInstance> result = new List<Modelo.Kontrol.Interfaces.IWorkflowInstance>();
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //                { "IdFlujo",DBNull.Value },
        //                { "IdFlujoInstancia",DBNull.Value },
        //                { "ClaveTipo", TypeKey},                        
        //                { "Referencia", Reference},
        //                { "ClaveWorkflow", OcultarFinalizados},
        //        };

        //        result = helper.CreateEntities<imodel.IWorkflowInstance>(USP_FLUJOTRABAJOINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);

        //        return result.Count == 0 ? null : result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public bool InsertStorageTarea(model.Interfaces.IStorageTarea st)
        //{
        //    List<imodel.IStorageTarea> result = null;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "TareaInstanciaId",st.TareaInstanciaId },
        //            { "DescripcionTareaInstancia",st.DescripcionTareaInstancia },
        //            { "TareaId",st.TareaId },
        //            { "DescripcionTarea",st.DescripcionTarea },
        //            { "IdStatus",st.IdStatus },
        //            { "NombreStatus",st.NombreStatus },
        //            { "Comentarios",st.Comentarios },
        //            { "FechaAsignacion",st.FechaAsignacion },
        //            { "FechaVigencia",st.FechaVigencia },
        //            { "CreadoPor",st.IdCreadoPor },
        //            { "ModificadoPor",st.IdModificadoPor },
        //            { "Orden",st.Orden },
        //            { "Estado",st.EstadoStr },
        //            { "Tipo","N" },
        //            { "IdEstatus",st.IdEstatus }
        //        };

        //        result = helper.CreateEntities<imodel.IStorageTarea>(USP_STORAGETAREA_INSERT, CommandType.StoredProcedure, parameters);

        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //var conn = ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString;            

        //var query = @"INSERT INTO dbo.StorageTarea(TareaInstanciaId,DescripcionTareaInstancia,TareaId,DescripcionTarea,
        //                IdStatus,NombreStatus,Comentarios,Creado,Modificado,FechaAsignacion,FechaVigencia,
        //                CreadoPor,ModificadoPor,Orden,Estado,Tipo,IdEstatus)
        //            VALUES(@TareaInstanciaId,@DescripcionTareaInstancia,@TareaId,@DescripcionTarea,@IdStatus,@NombreStatus,
        //                    @Comentarios,GETUTCDATE(),GETUTCDATE(),@FechaAsignacion,@FechaVigencia,@CreadoPor,
        //                    @ModificadoPor,@Orden,@Estado,@Tipo,@IdEstatus);";

        //using (var cn = new SqlConnection(conn))
        //{
        //    using (var cmd = new SqlCommand(query, cn))
        //    {
        //        cmd.Parameters.Add("@TareaInstanciaId", SqlDbType.Int).Value = st.TareaInstanciaId;
        //        cmd.Parameters.Add("@DescripcionTareaInstancia", SqlDbType.VarChar).Value = st.DescripcionTareaInstancia;
        //        cmd.Parameters.Add("@TareaId", SqlDbType.Int).Value = st.TareaId;
        //        cmd.Parameters.Add("@DescripcionTarea", SqlDbType.VarChar).Value = st.DescripcionTarea;
        //        cmd.Parameters.Add("@IdStatus", SqlDbType.Int).Value = st.IdStatus;
        //        cmd.Parameters.Add("@NombreStatus", SqlDbType.VarChar).Value = st.NombreStatus;
        //        cmd.Parameters.Add("@Comentarios", SqlDbType.VarChar).Value = st.Comentarios;
        //        //cmd.Parameters.Add("@Creado", SqlDbType.DateTime).Value = st.Creado;
        //        //cmd.Parameters.Add("@Modificado", SqlDbType.DateTime).Value = st.Modificado;
        //        //cmd.Parameters.Add("@FechaAprobacion", SqlDbType.DateTime).Value = st.FechaAprobacion;
        //        cmd.Parameters.Add("@FechaAsignacion", SqlDbType.DateTime).Value = st.FechaAsignacion;
        //        cmd.Parameters.Add("@FechaVigencia", SqlDbType.DateTime).Value = st.FechaVigencia;
        //        cmd.Parameters.Add("@CreadoPor", SqlDbType.Int).Value = st.IdCreadoPor;
        //        cmd.Parameters.Add("@ModificadoPor", SqlDbType.Int).Value = st.IdModificadoPor;
        //        //cmd.Parameters.Add("@AprobadoPor", SqlDbType.Int).Value = st.AprobadoPor;
        //        cmd.Parameters.Add("@Orden", SqlDbType.Int).Value = st.Orden;
        //        cmd.Parameters.Add("@Estado", SqlDbType.VarChar).Value = st.EstadoStr;
        //        cmd.Parameters.Add("@IdEstatus", SqlDbType.Int).Value = st.IdEstatus;
        //        cmd.Parameters.Add("@Tipo", SqlDbType.VarChar).Value = "N";

        //        cn.Open();

        //        cmd.ExecuteNonQuery();
        //    }
        //}

        //return true;
        //}


    }
}
