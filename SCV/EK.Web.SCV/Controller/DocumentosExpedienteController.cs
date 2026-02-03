using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.SCV.Controller
{
    public class DocumentosExpedienteController : EK.Common.BaseKontroller
    {
        [Route("documentosExpediente/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        {
            return await Get("/DocumentosExpediente/GetAll")
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("documentosExpediente({id})")]
        [Route("documentosExpediente/GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/DocumentosExpediente/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("documentosExpediente/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get("/DocumentosExpediente/Save")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("documentosExpediente/Imprimir")]
        [HttpGet]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/DocumentosExpediente/GetAll")
                .Add("activos", 1)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/DocumentosExpediente.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }


        //[Route("documentosExpediente/Exportar")]
        //[HttpGet]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/DocumentosExpediente/GetAll")
        //        .Add("activos", 1)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "DocumentosExpediente.xlsx";
        //    configuracion.NombreHojaTrabajo = "DocumentosExpediente";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Número de Copias", Campo = "NumeroCopias" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
