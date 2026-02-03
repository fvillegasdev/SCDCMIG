using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using web = System.Web.Http;

namespace EK.Web.SCV.Controller
{
    public class UbicacionesController : EK.Common.BaseKontroller
    {
        [Route("Ubicaciones({id},{disponibles})")]
        [Route("Ubicaciones/GetAll({id},{disponibles})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int id, int disponibles)
        {
            return await Get("/Ubicaciones/GetAll")
                .Add("id", id)
                .Add("disponibles", disponibles)
                .ExecuteAsync();
        }

        [Route("Ubicaciones({id})")]
        [Route("Ubicaciones/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Ubicaciones/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("ubicaciones/search")]
        [HttpPost]
        public async Task<ActionResult> Search([web.FromBody] string search, [web.FromUri] int idDesarrollo, [web.FromUri] string estatus)
        {
            var claveEstatus = estatus == "disponibles" ? "D" : "C";

            return await Get("/Ubicaciones/Search")
                .Add("idDesarrollo", idDesarrollo)
                .Add("claveEstatus", claveEstatus)
                .Add("parametro", search)
                .ExecuteAsync();
        }

        [Route("Ubicaciones/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        { 
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get("/Ubicaciones/Save")
               .Add("ubicacion", input)
               .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("Ubicaciones/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/Ubicaciones/GetAll")
                .Add("id", 0)
                .Add("disponibles", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Ubicaciones.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        [Route("Ubicaciones/UbicacionCoordenadas/{id}")]
        public async Task<ActionResult> UbicacionCoordenadas(int id)
        {
            var d = new Dictionary<string, object>() { { "id", id } };

            return await Get("/UbicacionCoordenadas/GetById")
                   .Add("parametros",d)
                   .ExecuteAsync();
        }

        [Route("Ubicaciones/UbicacionCoordenadasSave/")]
        public async Task<ActionResult> UbicacionCoordenadasSave()
        {
            //var d = new Dictionary<string, object>() { { "ID", id } };
            var input = base.GetInputData();
            return await Get("/UbicacionCoordenadas/Save")
                   .Add("parametros", input)
                   .ExecuteAsync();
        }


        [Route("base/scv/ubicaciones/exportarReporte/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> Exportar(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            dynamic data = await Get($"/ubicaciones/GetConsultaUbicaciones")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Excel().Exportar("ubicaciones", data);
        }

        [Route("base/scv/ubicaciones/exportarReporte")]
        [HttpPost]
        public async Task<ActionResult> ExportarPost(string modulo, string bp)
        {
            string filtros = Request.Form["data"];
            var obj = filtros != null ? base.GetEncodedDictionary(filtros) : new Dictionary<string, object>();

            dynamic data = await Get($"/ubicaciones/GetConsultaUbicaciones")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Excel().Exportar("ubicaciones", data);
        }

        //[Route("Ubicaciones/ShowLocation/{id}")]
        //public async Task<ActionResult> ShowLocation(int id)
        //{
        //    //Get GeoJsonFiles
        //    return await Task.Run(()=> PartialView("_Map"));
        //}
        //[Route("Ubicaciones/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Ubicaciones/GetAll")
        //        .Add("id", 0)
        //        .Add("disponibles", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Ubicaciones.xlsx";
        //    configuracion.NombreHojaTrabajo = "Ubicaciones";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Desarrollo", Campo = "Desarrollo.Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "SuperManzana", Campo = "SuperManzana" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Manzana", Campo = "Manzana" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Lote", Campo = "Lote" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Interior", Campo = "Interior" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus Ubicación", Campo = "EstatusUbicacion.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
