using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.IO;
using Newtonsoft.Json.Linq;
using EK.Common.Exportacion;
using System.Collections.Generic;
using System.Web.UI;

namespace EK.Web.SCV.Controller
{
    public class ReporteFallasController : EK.Common.BaseKontroller
    {
        [Route("scv/reportesFallas/calcularPartida/")]
        [HttpPost]
        public async Task<ActionResult> CalcularPartida()
        {
            dynamic data = base.GetInputObject();
            string partida = JsonConvert.SerializeObject(data.partida);
            string reporte = JsonConvert.SerializeObject(data.reporte);

            try
            {
                return await Get("/ReportesFallas/CalcularPartida")
                    .Add("partida", partida)
                    .Add("reporte", reporte)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/enviarCorreoDiarioCAT/")]
        [HttpPost]
        public async Task<ActionResult> enviarCorreoDiarioCAT()
        {
            try
            {
                return await Get("/ReportesFallas/EnviarCorreoDiarioACat")
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/GetListaCatsEnviarCorreo/")]
        [HttpGet]
        public async Task<ActionResult> GetListaCatsEnviarCorreo()
        {
            try
            {
                return await Get("/ReportesFallas/GetListaCatsForSendEmail")
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/GetUsuarioDesignadoRemitente/")]
        [HttpGet]
        public async Task<ActionResult> GetUsuarioDesignadoRemitente()
        {
            try
            {
                return await Get("/ReportesFallas/GetListaCatsForSendEmail")
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/calcularReincidencias/")]
        [HttpPost]
        public async Task<ActionResult> CalcularReincidencias()
        {
            dynamic data = base.GetInputObject();
            string item = JsonConvert.SerializeObject(data.partida);

            try
            {
                return await Get("/ReportesFallas/CalcularReincidencias")
                    .Add("item", item)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/calcularPartidasOT/")]
        [HttpPost]
        public async Task<ActionResult> CalcularPartidasOT()
        {
            try
            {
                dynamic obj = base.GetInputObject();
                int idReporte = Convert.ToInt32(obj.idReporte);
                int idContratista = Convert.ToInt32(obj.idContratista);
                string orden = JsonConvert.SerializeObject(obj.orden);
                dynamic ordenes = JsonConvert.SerializeObject(obj.ordenes);

                return await Get("/ReportesFallas/CalcularPartidasOT")
                    .Add("idReporte", idReporte)
                    .Add("idContratista", idContratista)
                    .Add("orden", orden)
                    .Add("ordenes", ordenes)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/GetMotivosCancelacionFolio/")]
        [HttpPost]
        public async Task<ActionResult> GetMotivosCancelacionFolio()
        {
            try
            {
                return await Get("/ReportesFallas/GetMotivosCancelacionFolio")
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/imprimirOT/{encodedData}")]
        [HttpPost]
        public async Task<ActionResult> ImprimirOTStringData(string encodedData)
        {
            try
            {
                dynamic data = base.GetInputFormObject();
                string item = JsonConvert.SerializeObject(data);
                // var obj = encparams != null ? base.GetEncodedDictionary(encparams) : new Dictionary<string, object>();

                dynamic content = await Get("/ReportesFallas/GetEncodedDocumentOT")
                    .Add("obj", item)
                    .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);
                string namex = string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid);
                //{indicar al response que muestre el documento en el browser}
                Response.AddHeader("content-disposition", string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid));
                //Response.AddHeader("content-disposition", "inline; orden_trabajo.pdf");

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/imprimirOT")]
        [HttpPost]
        public async Task<ActionResult> ImprimirOT()
        {
            try
            {
                dynamic data = base.GetInputFormObject();
                 string item = JsonConvert.SerializeObject(data);
               // var obj = encparams != null ? base.GetEncodedDictionary(encparams) : new Dictionary<string, object>();


               dynamic content = await Get("/ReportesFallas/GetEncodedDocumentOT")
                  .Add("obj", item)
                   .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);
                string namex = string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid);
                //{indicar al response que muestre el documento en el browser}
                //Response.Write("<script language=javascript>console.log('XDD');</script>");

                //Response.AddHeader("content-disposition", string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid));
                Response.AddHeader("content-disposition", "inline;filename='archivo.pdf'");
                //Response.Write(" setTimeout(function {document.title = 'Nuevo titulo'; console.log('prueba')}, 500) ");
                //Response.Write("</script>");
                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/ImprimirOTbyId/{id}/{fileDescription}")]
        [HttpGet]
        public async Task<ActionResult> ImprimirOTbyId(int id, string fileDescription)
        {
            try
            {

                dynamic content = await Get("/ReportesFallas/GetEncodedDocumentOTById")
                    .Add("id", id)
                    .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);
                //string filename = string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid);
                string filename = $"inline; filename=\"{fileDescription}.pdf\"";
                Response.AddHeader("content-disposition", filename);
                return File(retValue, "application/pdf");
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/impresionDisponible/{id}")]
        [HttpGet]
        public async Task<bool> impresionDisponible(int id)
        {
            try
            {
                dynamic content = await Get("/ReportesFallas/GetEncodedDocumentOT")
                    .Add("id", id)
                    .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");
                if (content != null && content != "")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [Route("scv/reportesFallas/imprimirDiagnosticoById/{id}/{fileDescription}")]
        [HttpGet]
        public async Task<ActionResult> imprimirDiagnosticoById(int id, string fileDescription)
        {
            try
            {
                dynamic content = await Get("/ReportesFallas/GetEncodedDocumentDiagnostico")
                    .Add("id", id)
                    .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);

                //{indicar al response que muestre el documento en el browser}
                string filename = $"inline; filename=\"{fileDescription}.pdf\"";
                Response.AddHeader("content-disposition", filename);
                //Response.AddHeader("content-disposition", string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid));

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/imprimirDiagnostico/{id}")]
        [HttpGet]
        public async Task<ActionResult> imprimirDiagnostico(int id)
        {
            try
            {
                dynamic content = await Get("/ReportesFallas/GetEncodedDocumentDiagnostico")
                    .Add("id", id)
                    .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);

                //{indicar al response que muestre el documento en el browser}
                Response.AddHeader("content-disposition", string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid));

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [Route("scv/reportesFallas/imprimirDocumento/{accion}/{id}")]
        [HttpGet]
        public async Task<ActionResult> ImprimirDocumento(string accion, int id)
        {
            try
            {
                dynamic content = await Get("/ReportesFallas/GetEncodedDocumento")
                    .Add("accion", accion)
                    .Add("id", id)
                    .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);

                //{indicar al response que muestre el documento en el browser}
                Response.AddHeader("content-disposition", string.Format("inline; filename=\"{0}_{1}.pdf\"", accion, id));

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

       

        [Route("scv/reportesFallas/consulta/")]
        [HttpPost]
        public async Task<ActionResult> GetConsulta()
        {
            try
            {
                return await Get("/ReportesFallasConsulta/GetConsulta")
                    .Add("filters", base.GetInputData())
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/consultasega/")]
        [HttpPost]
        public async Task<ActionResult> GetConsultaSEGA()
        {
            try
            {
                return await Get("/ReportesFallasConsulta/GetConsultaDatosSEGA")
                    .Add("filters", base.GetInputData())
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/consultanovigentes/")]
        [HttpPost]
        public async Task<ActionResult> GetConsultaNoVigentes()
        {
            try
            {
                return await Get("/ReportesFallasConsulta/GetConsultaIncidenciasNoVigentes")
                    .Add("filters", base.GetInputData())
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/AutorizarPartidasSinGarantia/")]
        [HttpPost]
        public async Task<ActionResult> AutorizarPartidas()
        {
            try
            {
                dynamic obj = base.GetInputObject();
                string item = JsonConvert.SerializeObject(obj);
                return await Get("/ReportesFallas/AutorizarPartidasSinGarantia")
                    .Add("parametros", item)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/consulta/exportar")]
        [HttpPost]
        public async Task<ActionResult> Exportar()
        {
            string filters = Request.Form["data"];

            dynamic data = await Get("/ReportesFallasConsulta/GetConsulta")
                .Add("filters", filters)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Excel().Exportar("ReportesFallasConsulta", data);
        }


        [Route("scv/SPVEncuestasSatisfaccionFija/getIncuest/")]
        [HttpPost]
        public async Task<ActionResult> GetIncuest()
        {
            dynamic data = base.GetInputObject();
            string itemEntity = JsonConvert.SerializeObject(data.dataEntity);
          //  string reporte = JsonConvert.SerializeObject(data.reporte);

            try
            {
                return await Get("/SPVEncuestasSatisfaccionFija/GetIncuest")
                    .Add("item", itemEntity)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/reportesFallas/GetFileDiagnosticateImageCAT/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetFileDiagnosticateImageCAT(int id)
        {
            try
            {
                dynamic content = await Get("/ReportesFallas/GetPathDiagnosticateImageCAT")
                    .Add("id", id)
                    .ExecuteAsync<string>();
                dynamic jObject = JsonConvert.DeserializeObject(content);
                string PathImageDiagnosticate = jObject[0].GetValue("PathImageDiagnosticate").ToString();
               
                return File(PathImageDiagnosticate, "image/jpg");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}