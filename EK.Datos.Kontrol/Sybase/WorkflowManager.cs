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
//    public class WorkflowManager: idata.IWorkflowManager
//    {
//        private const string USP_FLUJOTRABAJOINSTANCIA_SELECT = "{call usp_flujotrabajoinstancia_select(?,?,?,?,?)}";
//        private const string USP_STORAGETAREA_INSERT = "{call usp_storagetarea_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//        private idata.IDBHelper helper;

//        public WorkflowManager(imodel.IContainerFactory factory, idata.IDBHelper helper)
//        {
//            //this.helper = helper;
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }


//        public List<imodel.IWorkflowInstance> GetWorkflowInstancebyReference(string TypeKey ,string Reference,int OcultarFinalizados)
//        {
//            List<imodel.IWorkflowInstance> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                        { "IdFlujo",DBNull.Value },
//                        { "IdFlujoInstancia",DBNull.Value },
//                        { "ClaveTipo", TypeKey},                        
//                        { "Referencia", Reference},
//                        { "OcultarFinalizados",OcultarFinalizados }
//            };

//                result = helper.CreateEntities<imodel.IWorkflowInstance>(USP_FLUJOTRABAJOINSTANCIA_SELECT, CommandType.StoredProcedure, parameters);

//                return result;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public bool InsertStorageTarea(model.Interfaces.IStorageTarea st)
//        {
//            List<imodel.IStorageTarea> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "TareaInstanciaId",st.TareaInstanciaId },
//                    { "DescripcionTareaInstancia",st.DescripcionTareaInstancia },
//                    { "TareaId",st.TareaId },
//                    { "DescripcionTarea",st.DescripcionTarea },
//                    { "IdStatus",st.IdStatus },
//                    { "NombreStatus",st.NombreStatus },
//                    { "Comentarios",st.Comentarios },
//                    { "FechaAsignacion",st.FechaAsignacion },
//                    { "FechaVigencia",st.FechaVigencia },
//                    { "CreadoPor",st.IdCreadoPor },
//                    { "ModificadoPor",st.IdModificadoPor },
//                    { "Orden",st.Orden },
//                    { "Estado",st.EstadoStr },
//                    { "Tipo","N" },
//                    { "IdEstatus",st.IdEstatus }
//                };

//                result = helper.CreateEntities<imodel.IStorageTarea>(USP_STORAGETAREA_INSERT, CommandType.StoredProcedure, parameters);

//                return true;
//            }
//            catch (Exception)
//            {
//                throw;
//            }

//        }       


//    }
//}
