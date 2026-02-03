using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace EK.Web.SCV.Controller
{
    public class PlanesPagosController : EK.Common.BaseKontroller
    {
        [Route("planesPagos/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        {
            return await Get("/PlanesPagos/GetAll")
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("planesPagos({id})")]
        [Route("planesPagos/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/PlanesPagos/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("planesPagos/GetConceptosPagosById({id})")]
        [Route("planesPagos/GetConceptosPagosById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetConceptosPagosById(int id)
        {
            return await Get("/PlanesPagos/GetConceptosPagosById")
              .Add("id", id)
              .ExecuteAsync();
        }

        [Route("planesPagos/GetListConfiguracionById{id}")]
        [Route("planesPagos/GetListConfiguracionById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetListTiposFCById(int id)
        {
            try
            {
                return await Get("/PlanesPagos/GetListConfiguracionById")
                .Add("id", id)
                .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("planesPagos/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {

            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get("/PlanesPagos/Save")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        [Route("planesPagos/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/PlanesPagos/GetAll")
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/PlanesPagos.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //[Route("planesPagos/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/PlanesPagos/GetAll")
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "PlanesPagos.xlsx";
        //    configuracion.NombreHojaTrabajo = "Planes de Pagos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripcion", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Vigencia Inicio", Campo = "VigenciaInicio" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Vigencia Fin", Campo = "VigenciaFin" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
