using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using EK.Modelo.Kontrol;
using Newtonsoft.Json;
using System.Data;
using System.IO;
using System.Web;
using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;

namespace EK.Web.Kontrol.Controllers
{
    public class WorkflowsController : EK.Common.BaseKontroller
    {
        public WorkflowsController() : base() { }

        #region "TIPO WORKFLOW"
        [Route("Workflows/GetAllWorkflowTypes/{MostrarDisponibles}")]
        [HttpGet]
        public async Task<ActionResult> GetAllWorkflowTypes(bool MostrarDisponibles)
        {
            var TWF =await Get("/WorkflowType/GetAll").Add("ShowAvailables", MostrarDisponibles).ExecuteAsync();

            return TWF;
        }

        //public async Task<ActionResult> ExportarInstanceList()
        //{
        //    dynamic obj = await Get("/WorkflowType/GetAll").Add("ShowAvailables", false).ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Tipos_de_autorizaciones.xlsx";
        //    configuracion.NombreHojaTrabajo = "TiposAutorizaciones";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        [HttpGet]
        public async Task<ActionResult> ImprimirInstanceList()
        {
            ViewBag.Data = await Get("/WorkflowType/GetAll").Add("ShowAvailables", false).ExecuteAsync<JToken>();
            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoInstanceList.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        [Route("Workflows/GetWorkflowTypesById/{IdTipoFlujo}")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowTypesById(int IdTipoFlujo)
        {
            return await Get("/WorkflowType/GetById").Add("Id", IdTipoFlujo).ExecuteAsync();

        }

        [Route("Workflows/SaveWorkflowType")]
        [HttpPost]
        public async Task<ActionResult> SaveWorkflowType()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            string FormJson = input.ToString();

            return await Get("/WorkflowType/Save").Add("FormJson", FormJson).ExecuteAsync();

        }

        #endregion

        #region "WORKFLOW"
        [Route("workflows/catalogo({idTipo})")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowsList(int idTipo)
        {
            var WF = await Get("/Workflows/GetWorkflowsList")
                .Add("idTipo", idTipo)
                .ExecuteAsync();

            return WF;
        }

        [Route("workflows/GetWorkflowByTipo({ClaveTipo})")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowByTipo(string ClaveTipo)
        {
            try
            {
                return await Get("/flujoAutorizacion/GetWorkflowByTipo")
                 .Add("ClaveTipo", ClaveTipo)
                 .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //public async Task<ActionResult> ExportarFlujoTrabajo()
        //{
        //    dynamic obj = await Get("/Workflows/GetWorkflowsList").ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Flujos_de_autorizaciones.xlsx";
        //    configuracion.NombreHojaTrabajo = "Flujos de autorizaciones";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Alias" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        [HttpGet]
        public async Task<ActionResult> ImprimirFlujoTrabajo()
        {
            ViewBag.Data = await Get("/Workflows/GetWorkflowsList").ExecuteAsync<JToken>();
            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoFlujoTrabajo.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        [Route("Workflows/GetWorkflowsByIdUser/")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowsByIdUser()
        {
            var WF = await Get("/Workflows/GetWorkflowsByIdUser").ExecuteAsync();

            return WF;
        }

        [Route("Workflows/GetWorkflowById/{idFlujo}/")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowById(int idFlujo)
        {
            return await Get("/Workflows/GetWorkflowById").Add("Id", idFlujo).ExecuteAsync();
        }

        [Route("Workflows/GetTasksByWorkflow/{idFlujo}/{Editar}")]
        [HttpGet]
        public async Task<ActionResult> GetTasksByWorkflow(int idFlujo, int Editar)
        {
            return await Get("/Workflows/GetTasksByWorkflow").Add("idFlujo", idFlujo).Add("Editar", Editar == 0 ? false : true).ExecuteAsync();
        }

        [Route("workflows/save")]
        [HttpPut]
        public async Task<ActionResult> SaveWorkflow()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            string FormJson = input.ToString();
            //if (idFlujo == 0)
            //{
            //    return await Get("/Workflows/SaveWorkflow").Add("FormJson", FormJson).ExecuteAsync();
            //}
            //else
            //{
                return await Get("/Workflows/Save").Add("workflow", FormJson).ExecuteAsync();
            //}

        }

        [Route("Workflows/GetNotifiersByWorkflow/{idFlujo}/")]
        [HttpGet]
        public async Task<ActionResult> GetNotifiersByWorkflow(int idFlujo)
        {
            return await Get("/Workflows/GetNotifiersByWorkflow").Add("idFlujo", idFlujo).ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> GetPossibleNotificators(string search)
        {
            return await Get("/Workflows/GetPossibleNotificators").Add("search", search).ExecuteAsync();
        }

        [HttpGet]
        public async Task<ActionResult> SaveNotifierWorkflow(int FlujoId, int NotificadorId, string Tipo)
        {
            return await Get("/Workflows/SaveNotifierWorkflow").Add("FlujoId", FlujoId).Add("NotificadorId", NotificadorId).Add("Tipo", Tipo).ExecuteAsync();
        }

        [HttpGet]
        public async Task<ActionResult> DeleteNotifierWorkflow(int FlujoId, int NotificadorId, string Tipo)
        {
            return await Get("/Workflows/DeleteNotifierWorkflow").Add("FlujoId", FlujoId).ExecuteAsync();
        }

        #endregion

        #region "WORKFLOW INSTANCIA"
        [Route("workflowManager/instances/all/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetAllWorkflows(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/WorkflowManager/GetInstances").Add("parametros", obj).ExecuteAsync();
        }

        [Route("workflowManager/instances/user/{filtros}/{type?}")]
        [HttpGet]
        public async Task<ActionResult> GetUserWorkflows(string filtros, string type = null)
        {
            var obj = base.GetEncodedDictionary(filtros);

            if (type == "exportar")
            {
                dynamic data = await Get("/WorkflowManager/GetUserInstances").Add("parametros", obj).ExecuteAsync<JToken>();

                ViewBag.Data = data;

                return new Excel().Exportar("wfManager", data);
            }
            else
            {
                return await Get("/WorkflowManager/GetUserInstances").Add("parametros", obj).ExecuteAsync();
            }
        }

        [Route("Workflows/GetWorkflowsInstanceList/{idFlujo}/")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowsInstanceList(int idFlujo)
        {
            var result = await Get("/WorkflowInstance/GetWorkflowInstancesList").Add("idFlujo", idFlujo).ExecuteAsync();
            return result;
        }


        //public async Task<ActionResult> ExportarProcesosActivos()
        //{
        //    int idFlujo = Convert.ToInt32(Request.QueryString["idFlujo"].ToString());
        //    dynamic obj = await Get("/WorkflowInstance/GetWorkflowInstancesList").Add("idFlujo", idFlujo).ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Procesos_Activos.xlsx";
        //    configuracion.NombreHojaTrabajo = "ProcesosActivos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Alias", Campo = "Alias" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Referencia", Campo = "Referencia" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Status", Campo = "StatusNombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        [HttpGet]
        public async Task<ActionResult> ImprimirProcesosActivos(int idFlujo)
        {
            ViewBag.Data = await Get("/WorkflowInstance/GetWorkflowInstancesList").Add("idFlujo", idFlujo).ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoProcesosActivos.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        [Route("Workflows/GetWorkflowInstancebyId/{idInstancia}")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowInstancebyId(int idInstancia)
        {
            return await Get("/WorkflowInstance/GetWorkflowInstancebyId").Add("IdInstancia", idInstancia).ExecuteAsync();
        }

        [Route("Workflows/GetTaskInstancesByWorkflowInstance/{idInstancia}")]
        [HttpGet]
        public async Task<ActionResult> GetTaskInstancesByWorkflowInstance(int idInstancia)
        {
            return await Get("/WorkflowInstance/GetTaskInstancesByWorkflowInstance").Add("idFlujoInstancia", idInstancia).ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> CancelWorkflowInstance(int idInstancia)
        {
            return await Get("/WorkflowInstance/CancelWorkflowInstance").Add("idInstancia", idInstancia).ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> UpdateStatusWorkflowInstance(int idInstancia, int IdStatus)
        {
            return await Get("/WorkflowInstance/UpdateStatusWorkflowInstance").Add("IdInstancia", idInstancia).Add("IdStatus", IdStatus).ExecuteAsync();
        }

        [Route("Workflows/GetWorkflowReferencebyIdInstance/{idInstancia}")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowReferencebyIdInstance(int idInstancia)
        {
            return await Get("/workflows/GetWorkflowReferencebyIdInstance").Add("idInstancia", idInstancia).ExecuteAsync();
        }

        [Route("Workflows/GetWorkflowReferencebyIdTaskInstance/{idTareaInstancia}")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowReferencebyIdTaskInstance(int idTareaInstancia)
        {
            return await Get("/WorkflowInstance/GetWorkflowReferencebyIdTaskInstance").Add("idTareaInstancia", idTareaInstancia).ExecuteAsync();
        }

        [Route("Workflows/GetTaskInstancesByTaskInWorkflow/{idTareaInstancia}")]
        [HttpGet]
        public async Task<ActionResult> GetTaskInstancesByTaskInWorkflow(int IdTareaInstancia)
        {
            return await Get("/WorkflowInstance/GetTaskInstancesByTaskInWorkflow").Add("IdTareaInstancia", IdTareaInstancia).ExecuteAsync();
        }

        [Route("Workflows/historyInstances")]
        public async Task<ActionResult> GetHistoryInstances()
        {
            return await Get("/WorkflowInstance/GetHistory")
                .Add("top", 25)
                .ExecuteAsync();
        }

        [Route("Workflows/historyInstances({id})")]
        public async Task<ActionResult> GetHistoryByIdInstance(string id)
        {
            return await Get("/WorkflowInstance/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .ExecuteAsync();
        }

        #endregion

        #region "TAREA"
        [Route("Workflows/GetWorkflowTasksById/{idTarea}")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowTasksById(int idTarea)
        {
            return await Get("/Workflows/GetWorkflowTasksById").Add("idTarea", idTarea).ExecuteAsync();
        }

        [HttpPut]
        public async Task<ActionResult> InsertTask(string FormJson)
        {
            return await Get("/Tasks/InsertTask").Add("FormJson", FormJson).ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> UpdateTask(string FormJson)
        {
            return await Get("/Tasks/UpdateTask").Add("FormJson", FormJson).ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> DeleteTask(string FormJson)
        {
            return await Get("/Tasks/DeleteTask").Add("FormJson", FormJson).ExecuteAsync();
        }

        [Route("Workflows/GetWorkflowTasksInfoNew/{idFlujo}")]
        [HttpGet]
        public async Task<ActionResult> GetWorkflowTasksInfoNew(int idFlujo)
        {
            return await Get("/Tasks/GetWorkflowTasksInfoNew").Add("idFlujo", idFlujo).ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> GetCommonDocuments(string search)
        {
            return await Get("/Tasks/GetCommonDocuments").Add("search", search).ExecuteAsync();
        }

        [HttpGet]
        public async Task<ActionResult> GetCommonDocumentsAll()
        {
            return await Get("/Tasks/GetCommonDocumentsAll").ExecuteAsync();
        }

        [Route("Workflows/GetCommonDocumentsByTask/{idTarea}")]
        [HttpGet]
        public async Task<ActionResult> GetCommonDocumentsByTask(int idTarea)
        {
            return await Get("/Tasks/GetCommonDocumentsByTask").Add("idTarea", idTarea).ExecuteAsync();
        }

        [Route("Workflows/GetTaskAssignedByTask/{IdTarea}/")]
        [HttpGet]
        public async Task<ActionResult> GetTaskAssignedByTask(int IdTarea)
        {
            return await Get("/Tasks/GetTaskAssignedByTask").Add("IdTarea", IdTarea).ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> GetPossibleAssignUsers(string search)
        {
            return await Get("/Tasks/GetPossibleAssignUsers").Add("search", search).ExecuteAsync();
        }

        [HttpGet]
        public async Task<ActionResult> SaveTaskAssignedUser(int IdTarea, int AsignadoId, string Tipo)
        {
            return await Get("/Tasks/SaveTaskAssignedUser").Add("IdTarea", IdTarea).Add("AsignadoId", AsignadoId).Add("Tipo", Tipo).ExecuteAsync();
        }

        [HttpGet]
        public async Task<ActionResult> DeleteTaskAssignedUser(int IdTarea)
        {
            return await Get("/Tasks/DeleteTaskAssignedUser").Add("IdTarea", IdTarea).ExecuteAsync();
        }
        #endregion

        #region"TAREA INSTANCIA"
        [Route("workflowManager/task/instance")]
        [HttpPost]
        public async Task<ActionResult> GetTaskInstanceByIdTask()
        {
            dynamic obj = GetInputObject();

            return await Get("/WorkflowManager/GetAssignedTask").Add("id", obj.id).ExecuteAsync();
        }
        [Route("workflowManager/task/approval")]
        [HttpPut]
        public async Task<ActionResult> TaskApproval()
        {
            dynamic obj = GetInputData();

            return await Get("/WorkflowManager/TaskApproval")
                .Add("tarea", obj).ExecuteAsync();
        }

        #endregion

        #region "Proceso de Autorizacion de Tareas"
        [Route("Workflows/UpdateWorkflowProcess/")]
        [HttpPost]
        public async Task<ActionResult> UpdateWorkflowProcess()
        {
            try
            {
                Request.InputStream.Position = 0;
                var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
                string FormJson = input.ToString();
                await Get("/TaskInstance/UpdateTaskInstance").Add("FormJson", FormJson).ExecuteAsync();

                return Json(new object());
            }
            catch (Exception)
            {

                throw;
            }

        }


        [HttpPut]
        public async Task<ActionResult> InsertDocumentsTaskInstance()
        {
            try
            {

                string FormJson = Request.Form["item"];
                var model = JsonConvert.DeserializeObject<DocumentosTareaInstancia>(FormJson);
                if (Request.Files.Count > 0)
                {
                    var ms = new MemoryStream();
                    var file = Request.Files[0];
                    var fileName = string.Format("{0}", "workflow/" + model.FlujoTrabajoInstanciaId + "/" + model.TareaInstanciaId + "/" + file.FileName);
                    var fileMD = new Dictionary<string, string>();


                    fileMD.Add("source", "ek");
                    fileMD.Add("id", Convert.ToString(model.ID));
                    fileMD.Add("name", Convert.ToString(model.text));
                    fileMD.Add("referencia", Convert.ToString(model.Referencia));
                    fileMD.Add("obligatorio", Convert.ToString(model.Obligatorio));
                    fileMD.Add("tareaInstanciaId", Convert.ToString(model.TareaInstanciaId));
                    fileMD.Add("entity", "workflow");

                    file.InputStream.CopyTo(ms);

                    GetFileManager().Save(fileName, file.ContentType, fileMD, ms.ToArray());
                }

                var result = await Get("/TaskInstance/InsertDocumentsTaskInstance").Add("FormJson", FormJson).ExecuteAsync();

                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }


        [HttpPost]
        public async Task<ActionResult> DeleteDocumentsTaskInstance()
        {
            try
            {
                Request.InputStream.Position = 0;
                var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
                string FormJson = input.ToString();

                var model = JsonConvert.DeserializeObject<DocumentosTareaInstancia>(FormJson);

                GetFileManager().Delete("workflow/" + model.FlujoTrabajoInstanciaId + "/" + model.TareaInstanciaId + "/" + model.text);

                var result = await Get("/TaskInstance/DeleteDocumentsTaskInstance").Add("FormJson", FormJson).ExecuteAsync();

                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }


        [Route("Workflows/SendMailTaskAssigned/{IdFlujo}/{IdModulo}/{IdCompania}/{IdTarea}/")]
        [HttpGet]
        public async Task<ActionResult> SendMailTaskAssigned(int IdFlujo, int? IdModulo, int? IdCompania, int IdTarea)
        {
            //var bodyStr= @"<html xmlns='http://www.w3.org/1999/xhtml'>
            //            <head>    
            //                <title>Usted tiene una nueva tarea de ENKONTROL!</title>
            //            </head>
            //            <body yahoo bgcolor='#f6f8f1'>
            //                <p>Estimado: Jorge Ramírez,</p></br>
            //                           <p>Por medio del presente correo se hace de su conocimiento que se ha generado una nueva tarea de autorización de proceso del sistema ENKONTROL.
            //                            Se le proporciona la siguiente liga con la cual podra acceder directamente a la tarea de autorización:</p></br>
            //                            </br>
            //                            http://www.enkontrol.com
            //                            </br>
            //                            <p>Le sugerimos atender lo mas pronto posible esta tarea.</p>              
            //            </body>
            //            </html>";

            await Get("/EnvioCorreo/SendMailTaskAssigned").Add("IdFlujo", IdFlujo).Add("IdModulo", IdModulo).Add("IdCompania", IdCompania).Add("IdTarea", IdTarea).ExecuteAsync();

            return null;

        }

        #endregion

        #region MisProcesos


        [Route("Workflows/GetMyProcess/{TipoConsulta}/")]
        [HttpGet]
        public async Task<ActionResult> GetMyProcess(int TipoConsulta)
        {
            var result = await Get("/WorkflowInstance/GetMyProcess")
                .Add("TipoConsulta", TipoConsulta)
                .ExecuteAsync();
            return result;
        }

        //public async Task<ActionResult> Exportar()
        //{
        //    int tipoconsulta = Convert.ToInt32(Request.QueryString["tipoconsulta"].ToString());
        //    dynamic obj = await Get("/WorkflowInstance/GetMyProcess")
        //        .Add("TipoConsulta", tipoconsulta)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Mis_Procesos.xlsx";
        //    configuracion.NombreHojaTrabajo = "MisProcesoso";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre Flujo", Campo = "NombreFlujo" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Alias", Campo = "Alias" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estado", Campo = "EstadoStr" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Referencia", Campo = "Referencia" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        [HttpGet]
        public async Task<ActionResult> Imprimir(int tipoconsulta)
        {
            ViewBag.Data = await Get("/WorkflowInstance/GetMyProcess")
                .Add("TipoConsulta", tipoconsulta)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoMisProcesos.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }
        #endregion

        #region Mis Tareas
        [Route("kontrol/workflows/assigned")]
        [HttpGet]
        public async Task<ActionResult> GetMyTasks(int TipoConsulta)
        {
            var result = await Get("/TaskInstance/GetMyTasks")
                .Add("TipoConsulta", TipoConsulta)
                .ExecuteAsync();
            return result;
        }

        //public async Task<ActionResult> ExportarMisTareas()
        //{
        //    int tipoconsulta = Convert.ToInt32(Request.QueryString["tipoconsulta"].ToString());
        //    dynamic obj = await Get("/TaskInstance/GetMyTasks")
        //        .Add("TipoConsulta", tipoconsulta)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Mis_Tareas.xlsx";
        //    configuracion.NombreHojaTrabajo = "MisTareas";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre Flujo", Campo = "NombreFlujoInstancia" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripción", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Comentarios", Campo = "Comentarios" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Status", Campo = "Status.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        [HttpGet]
        public async Task<ActionResult> ImprimirMisTareas(int tipoconsulta)
        {
            ViewBag.Data = await Get("/TaskInstance/GetMyTasks")
                .Add("TipoConsulta", tipoconsulta)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoMisTareas.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }
        #endregion

        #region Notificaciones
        [Route("notificaciones/enviar")]
        [HttpPut]
        public async Task<ActionResult> SaveNotificacion()
        {
            return await Get("/notificaciones/GuardarNotificacion").Add("mensaje", GetInputData()).ExecuteAsync();
        }

        [Route("notificaciones({id})/leida")]
        public async Task<ActionResult> SaveNotificacionLeida(int id)
        {
            string inputData = JsonConvert.SerializeObject(new
            {
                ID = id,
                Update = "LEIDO"
            });

            return await Get("/notificaciones/GuardarNotificacion").Add("modelo", inputData).ExecuteAsync();
        }
        #endregion


    }
}
