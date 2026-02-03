using Newtonsoft.Json;
using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Collections.Generic;
using s = EK.Drivers.Storage;
using System.IO;
using System.Text;

namespace EK.Web.SCV.Controller
{
    public class SeguimientosController : EK.Common.BaseKontroller
    {
        private const string MODULO_EK = "SCV";
        private const string ENTIDAD_EK = "Seguimientos";
        private const string ROUTE_EK = MODULO_EK + "/" + ENTIDAD_EK;
        private const string PROCESO_EK = "/" + MODULO_EK + ENTIDAD_EK;

        [Route(ROUTE_EK + "/GetAllByParams/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetAllByParams(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);
            return await Get(PROCESO_EK + "/GetAllByParams")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route(ROUTE_EK + "/GetByFase({idExpediente},{faseClave})")]
        [HttpGet]
        public async Task<ActionResult> GetByFase(int idExpediente, string faseClave)
        {
            return await Get(PROCESO_EK + "/GetSeguimientoByFase")
                .Add("idExpediente", idExpediente)
                .Add("faseClave", faseClave)
                .ExecuteAsync();
        }

        [Route(ROUTE_EK + "({activos})")]
        [Route(ROUTE_EK + "/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        {
            return await Get(PROCESO_EK + "/GetAll").Add("activos", activos).ExecuteAsync();
        }

        [Route(ROUTE_EK + "/GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get(PROCESO_EK + "/GetById").Add("id", id).ExecuteAsync();
        }

        [Route(ROUTE_EK + "/Create({idVenta},{idEsquema})")]
        [HttpGet]
        public async Task<ActionResult> Create(int idEntidadFase, int idEsquema)
        {
            return await Get(PROCESO_EK + "/Create")
                .Add("idEntidadFase", idEntidadFase)
                .Add("idEsquema", idEsquema)
                .ExecuteAsync();
        }

        [Route(ROUTE_EK + "/SaveSuspension/{claveEstatus}")]
        [HttpPut]
        public async Task<ActionResult> SaveSuspension(string claveEstatus)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get(PROCESO_EK + "/SaveSuspension")
                    .Add("item", input)
                    .Add("claveEstatus", claveEstatus)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get(PROCESO_EK + "/Save").Add("item", input).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/Autorizados/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetAutorizados(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get(PROCESO_EK + "/GetAutorizados")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route(ROUTE_EK + "/SeguimientoEtapas/{id}")]
        [HttpGet]
        public async Task<ActionResult> getSeguimientoEtapas(int id)
        {
            return await Get(PROCESO_EK + "/getSeguimientoEtapas").Add("IdSeguimiento", id).ExecuteAsync();
        }

        [Route(ROUTE_EK + "/SeguimientoRequisitos/{id}/{idEtapa}")]
        [HttpGet]
        public async Task<ActionResult> getSeguimientoRequisitos(int id, int idEtapa)
        {
            return await Get(PROCESO_EK + "/getSeguimientoRequisitos").Add("IdSeguimiento", id).Add("IdEtapa", idEtapa).ExecuteAsync();
        }

        [Route(ROUTE_EK + "/SeguimientoDocumentos/{id}/{idEtapa}")]
        [HttpGet]
        public async Task<ActionResult> getSeguimientoDocumentos(int id, int idEtapa)
        {
            return await Get(PROCESO_EK + "/getSeguimientoDocumentos").Add("IdSeguimiento", id).Add("IdEtapa", idEtapa).ExecuteAsync();
        }

        [Route(ROUTE_EK + "/SeguimientoProcesos/{id}/{idEtapa}")]
        [HttpGet]
        public async Task<ActionResult> getSeguimientoProcesos(int id, int idEtapa)
        {
            return await Get(PROCESO_EK + "/getSeguimientoProcesos").Add("IdSeguimiento", id).Add("IdEtapa", idEtapa).ExecuteAsync();
        }

        #region UTILS

        [Route(ROUTE_EK + "/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            dynamic data = await Get(PROCESO_EK + "/GetAll")
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Rotativa.ViewAsPdf("~/Views/" + MODULO_EK + "/Reportes/" + ENTIDAD_EK + ".cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        [Route(ROUTE_EK + "/AvanzarEtapa")]
        [HttpPut]
        public async Task<ActionResult> AvanzarEtapa()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get(PROCESO_EK + "/setAvanzarEtapa")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/ExecuteProcess")]
        [HttpPut]
        public async Task<ActionResult> ExecuteProcess()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get(PROCESO_EK + "/EjecutarProceso")
                    .Add("item", input)
                    .Add("transact", true)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/Procesos/{idExpediente}/{procesoClave}")]
        [HttpGet]
        public async Task<ActionResult> GetExpedienteProceso(int idExpediente, string procesoClave)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get(PROCESO_EK + "/getExpedienteProceso")
                    .Add("idExpediente", idExpediente)
                    .Add("procesoClave", procesoClave)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [NonAction] //url del archivo en el repositorio
        private string getRepositoryPath(int idExpediente, int idRequisito, string uid)
        {
            return string.Format("{0}", "scv/expedientes/" + idExpediente + "/requisitos/" + idRequisito + "/" + uid);
        }

        [NonAction] //url para descargar archivo desde controller
        private string getFilePath(int idExpediente, int idRequisito, string uid)
        {
            return string.Format("{0}", ROUTE_EK + "/Requisitos/GetFile/" + idRequisito + "/" + uid);
        }

        [Route(ROUTE_EK + "/SaveRequisito")]
        [HttpPut]
        public async Task<ActionResult> SaveRequisito()
        {
            try
            {
                Request.InputStream.Position = 0;
                var input = Request.Form["item"];

                dynamic obj = JObject.Parse(input);

                if (Request.Files.Count > 0)
                {
                    var fileProps = Request.Form["fileProps"];
                    dynamic props = JObject.Parse(fileProps);

                    if (obj != null && obj.ID > 0)
                    {
                        string rp = this.getRepositoryPath(
                            Convert.ToInt32(obj.IdExpediente),
                            Convert.ToInt32(obj.IdRequisito),
                            Convert.ToString(obj.Valor));

                        GetFileManager().Delete(rp);
                    }

                    DateTime dt = DateTime.UtcNow;
                    var ticks = dt.Ticks;
                    obj.Valor = ticks.ToString();

                    var ms = new MemoryStream();
                    var file = Request.Files[0];

                    var fileMD = new Dictionary<string, string>();
                    var fileName = Convert.ToString(props.Nombre);
                    //
                    fileMD.Add("source", "ek");
                    fileMD.Add("id", Convert.ToString(obj.ID));
                    fileMD.Add("expediente", Convert.ToString(obj.IdExpediente));
                    fileMD.Add("requisito", Convert.ToString(obj.IdRequisito));
                    fileMD.Add("uuid", Convert.ToString(obj.Valor));
                    fileMD.Add("name", Convert.ToBase64String(Encoding.UTF8.GetBytes(fileName)));

                    file.InputStream.CopyTo(ms);

                    string sp = this.getRepositoryPath(
                        Convert.ToInt32(obj.IdExpediente),
                        Convert.ToInt32(obj.IdRequisito),
                        Convert.ToString(obj.Valor));

                    GetFileManager().Save(sp, file.ContentType, fileMD, ms.ToArray());

                    string fp = this.getFilePath(
                        Convert.ToInt32(obj.IdExpediente),
                        Convert.ToInt32(obj.IdRequisito),
                        Convert.ToString(obj.Valor));

                    input = JsonConvert.SerializeObject(new
                    {
                        ID = obj.ID,
                        IdExpediente = obj.IdExpediente,
                        IdSeguimiento = obj.IdSeguimiento,
                        IdEtapa = obj.IdEtapa,
                        IdRequisito = obj.IdRequisito,
                        Valor = obj.Valor,
                        FechaVencimiento = obj.FechaVencimiento
                    });
                }

                return await Get(PROCESO_EK + "/SaveRequisito").Add("item", input).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/Requisitos/GetFile/{idExpediente}/{idRequisito}/{uid}")]
        [HttpGet]
        public ActionResult GetFile(int idExpediente, int idRequisito, string uid)
        {
            string rp = this.getRepositoryPath(idExpediente, idRequisito, uid);
            s.File file = GetFileManager().GetFile(rp);

            if (file != null)
            {
                string filename = string.Empty;
                file.Content.Position = 0;

                //
                if (file.MetaData.TryGetValue("name", out filename))
                {
                    file.Content.Position = 0;
                    filename = Encoding.UTF8.GetString(Convert.FromBase64String(filename));
                    //
                    var cd = new System.Net.Mime.ContentDisposition
                    {
                        FileName = filename,
                        Inline = false
                    };
                    Response.AppendHeader("Content-Disposition", cd.ToString());

                    return File(file.Content, file.ContentType, filename);
                }
                else
                {
                    file.Content.Position = 0;
                    return File(file.Content, file.ContentType);
                }
            }

            return HttpNotFound();
        }

        [Route("kontrolFiles/document/{entityType}/{entityID}/{type}/{Uid}")]
        [HttpGet]
        public ActionResult GetFileViewer(string entityType,string entityID,string type,string uid)
        {
            //kontrolFiles/seguimiento$documentos/944/plantillas/637109897403380117
            ViewBag.DocumentName = "";
            ViewBag.DocumentPath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", entityType, entityID, type, uid);
            ViewBag.DocumentFile = base.GetFileStorage(ViewBag.DocumentPath as string);
            return View("_DocumentViewer");
        }

        [Route("kontrolFiles/getLastVersion/{idSeguimiento}")]
        [HttpGet]
        public async Task<ActionResult> GetFileLastVersion(int idSeguimiento)
        {
            var param = new Dictionary<string, object>();
            param.Add("entityId", idSeguimiento);
            dynamic data = await Get("/SCVSeguimientos/GetLastVersionDocumento")
              .Add("parametros", param)
              .ExecuteAsync<JToken>();

            ViewBag.DocumentName = "";
            ViewBag.DocumentPath = data.FilePath;
            ViewBag.DocumentPath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", data.EntityType, data.EntityId, data.Tipo, data.Uid);

            ViewBag.DocumentFile = base.GetFileStorage(ViewBag.DocumentPath as string);
            return View("_DocumentViewer");
        }


        [Route("kontrolFiles/getLastVersion/Download/{idSeguimiento}")]
        [HttpGet]
        public async Task<ActionResult> GetFileDownloadLastVersion(int idSeguimiento)
        {
            try
            {
                var param = new Dictionary<string, object>();
                param.Add("entityId", idSeguimiento);
                dynamic data = await Get("/SCVSeguimientos/GetLastVersionDocumento")
                  .Add("parametros", param)
                  .ExecuteAsync<JToken>();

                string filePath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", data.EntityType, data.EntityId, data.Tipo, data.Uid);
                var file = GetFileManager().GetFile(filePath);

                if (file != null)
                {
                    string content = string.Format("{0}; filename=\"{1}\"", "attachment", data.Nombre);
                    Response.AddHeader("content-disposition", content);
                    file.Content.Position = 0;
                    return File(file.Content, file.ContentType);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return HttpNotFound();
        }



        [Route(ROUTE_EK + "/Requisitos/GetFileViewer/{idExpediente}/{idRequisito}/{uid}/{download}")]
        [HttpGet]
        public ActionResult GetFileViewer(int idExpediente, int idRequisito, string uid, bool? download)
        {
            if (download != null && download.Value) {
                return this.GetFile(idExpediente, idRequisito, uid);
            }
            //
            ViewBag.DocumentName = "";
            ViewBag.DocumentPath = this.getRepositoryPath(idExpediente, idRequisito, uid);
            ViewBag.DocumentUrl = Request.Url.AbsoluteUri.Replace("/false?", "/true?");
            ViewBag.DocumentFile = base.GetFileStorage(ViewBag.DocumentPath as string);

            return View("_DocumentViewer");
        }

        [Route(ROUTE_EK + "/Expediente/Documento/{clave}")]
        [HttpGet]
        public async Task<ActionResult> GetExpedienteFileViewer(string clave)
        {
            dynamic data = await Get("/Expedientes/GetDocumentByIdV2")
               .Add("clave", clave)
               .ExecuteAsync<JToken>();
            //
            ViewBag.DocumentName = "";
            ViewBag.DocumentPath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", data.EntityType, data.EntityId, data.Tipo, data.Uid);

            return View("_DocumentViewer");
        }

        [Route(ROUTE_EK + "/Expediente/Documento/Version/{idDocumentoVersion}")]
        [HttpGet]
        public async Task<ActionResult> GetExpedienteFileViewerVersion(int idDocumentoVersion)
        {
            dynamic data = await Get("/GestionDocumentos/GetDocumentVersionById")
               .Add("id", idDocumentoVersion)
               .ExecuteAsync<JToken>();
            //
            ViewBag.DocumentName = "";
            ViewBag.DocumentPath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", data.KontrolFile.EntityType, data.KontrolFile.EntityId, data.KontrolFile.Tipo, data.Uid);

            return View("_DocumentViewer");
        }


        [Route(ROUTE_EK + "/Exportar")]
        public async Task<ActionResult> Exportar()
        {
            dynamic data = await Get(PROCESO_EK + "/GetAll")
               .Add("activos", 0)
               .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            ViewBag.Data = data;

            return new Excel().Exportar("Seguimientos", data);
        }

        [Route(ROUTE_EK + "/SendAuthorization/Seguimiento/Etapa")]
        [HttpPut]
        public async Task<ActionResult> EnviarAutorizacionEtapa()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get(PROCESO_EK + "/EnviarAutorizacion").Add("item", input).ExecuteAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region TEST
        [Route(ROUTE_EK + "/test/authorize/{id}")]
        [HttpGet]
        public async Task<ActionResult> TestAuthorize(int id)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get(PROCESO_EK + "/Authorize")
                    .Add("id", id).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/test/reject/{id}")]
        [HttpGet]
        public async Task<ActionResult> TestReject(int id)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get(PROCESO_EK + "/Reject")
                    .Add("id", id).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/test/proceso/update/{id}/{claveEstatus}")]
        [HttpGet]
        public async Task<ActionResult> ProcesoUpdate(int id, string claveEstatus)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            dynamic item = JsonConvert.SerializeObject(new { ID = id });
            try
            {
                return await Get(PROCESO_EK + "/UpdateExpedienteProceso")
                    .Add("item", item)
                    .Add("claveEstatus", claveEstatus)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/test/requisito/authorize/{id}")]
        [HttpGet]
        public async Task<ActionResult> RequisitoAuthorize(int id)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get("/SCVSeguimientosRequisitos/Authorize")
                    .Add("id", id).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/test/requisito/reject/{id}")]
        [HttpGet]
        public async Task<ActionResult> RequisitoReject(int id)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get("/SCVSeguimientosRequisitos/Reject")
                    .Add("id", id).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        [Route(ROUTE_EK + "/documentos/generate/")]
        [HttpPut]
        public async Task<ActionResult> GenerarDocumento()
        {
            dynamic input = base.GetInputData();

            try
            {
                return await Get(PROCESO_EK + "/GenerarDocumento")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #region "Expediente documento"

        [Route("KontrolFiles/GenerarExpedienteDocumento/{idExpediente}")]
        [HttpPut]
        public async Task<ActionResult> GenerarExpedienteDocumento(int idExpediente)
        {
            try
            {
                Request.InputStream.Position = 0;
                var input = Request.Form["item"];

                if (Request.Files.Count > 0)
                {
                    var file = Request.Files[0];

                    var stream = new MemoryStream();
                    file.InputStream.CopyTo(stream);

                    return await Get("/GestionDocumentos/SaveFile")
                        .Add("item", input)
                        .Add("stream", stream)
                        .Add("contentType", file.ContentType)
                        .Add("idExpediente", idExpediente)
                        .ExecuteAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return HttpNotFound();
        }
        #endregion
    }
}