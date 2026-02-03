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
    public class SindicatosController : EK.Common.BaseKontroller
    {
        [Route("Sindicatos({id},{activos})")]
        [Route("Sindicatos/GetAll({id},{activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int id, int activos)
        {
            return await Get("/Sindicatos/GetAll")
                //.Add("id", id)
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("Sindicatos({id})")]
        [Route("Sindicatos/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Sindicatos/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("Sindicatos/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Sindicatos/Save")
                .Add("sindicato", input)
                .ExecuteAsync();
        }

        [Route("Sindicatos/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/Sindicatos/GetAll")
                .Add("id", 0)
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Sindicatos.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //[Route("Sindicatos/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Sindicatos/GetAll")
        //        .Add("id", 0)
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Sindicatos.xlsx";
        //    configuracion.NombreHojaTrabajo = "Sindicatos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
