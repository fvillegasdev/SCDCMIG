using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.SCV.Controller
{
    public class ExpedientesController : EK.Common.BaseKontroller
    {
        [Route("SCV/Expedientes/Configuracion/Owners/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetOwners(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get($"/Expedientes/GetOwners")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("SCV/Expedientes/Configuracion/Relacionados/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetRelacionados(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get($"/Expedientes/GetRelacionados")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        //[Route("SCV/Expedientes/Configuracion/Save/{filtros}")]
        //[HttpPut]
        //public async Task<ActionResult> SaveConfiguracion(string filtros)
        //{
        //    var obj = base.GetEncodedDictionary(filtros);

        //    Request.InputStream.Position = 0;
        //    var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

        //    try
        //    {
        //        return await Get($"/Expedientes/SaveConfiguracion")
        //            .Add("item", input)
        //            .Add("parametros", obj)
        //            .ExecuteAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        [Route("SCV/Expedientes/Cancelacion/Allow/{id}")]
        [HttpGet]
        public async Task<ActionResult> AllowCancelacion(int id)
        {
            return await Get($"/Expedientes/AllowCancelacion")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("SCV/Expedientes/Cancelacion/{id}")]
        [HttpPut]
        public async Task<ActionResult> CancelarExpediente(int id)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get($"/Expedientes/CancelarExpediente")
                    .Add("id", id)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/expedientes/object/{idExpediente}/{entityName}/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetExpedienteObject(int idExpediente, string entityName, int id)
        {
            return await Get($"/Expedientes/GetExpedienteObject")
                .Add("idExpediente", idExpediente)
                .Add("entityName", entityName)
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("expediente/generar/escrituracion/{idExpediente}")]
        [HttpGet]
        public async Task<ActionResult> GenerarEscrituracion(int idExpediente)
        {
            try
            {
                dynamic content = await Get("/expedientes/GenerarEscrituracion")
                    .Add("idExpediente", idExpediente)
                    .ExecuteAsync<string>();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);

                //{indicar al response que muestre el documento en el browser}
                Response.AddHeader("content-disposition", "inline; filename=\"propuesta.pdf\"");

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [Route("expediente/generar/hojaDatosGenerales/{idExpediente}")]
        [HttpGet]
        public async Task<ActionResult> GenerarHojaDatosGenerales(int idExpediente)
        {
            try
            {
                dynamic content = await Get("/expedientes/GenerarHojaDatosGenerales")
                    .Add("idExpediente", idExpediente)
                    .ExecuteAsync<string>();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);

                //{indicar al response que muestre el documento en el browser}
                Response.AddHeader("content-disposition", "inline; filename=\"propuesta.pdf\"");

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [Route("expediente/exportar/")]
        [HttpPost]
        public async Task<ActionResult> GetReport()
        {
            var input = Request.Form["data"]; 
            dynamic obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(input);

            dynamic data = await Get("/expedientes/Export")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;
            return new Excel().Exportar("Expedientes", data);

        }
    }
}