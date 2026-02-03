using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    [Authorize]
    public class CatalogosGeneralesValoresController 
        : EK.Common.BaseKontroller
    {
        [Route("catalogos/get/{id}")]
        [HttpGet]
        public async Task<ActionResult> Get(int id)
        {
            return await Get("/CatalogosGeneralesValores/GetByID")
                .Add("id", id)
                .ExecuteAsync();
        }

        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/CatalogosGeneralesValores/Save")
                .Add("catalogogeneralvalores", input)
                .ExecuteAsync();
        }

        [Route("catalogos({clave})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(string clave)
        {
            return await Get("/CatalogosGeneralesValores/GetByCatalogo")
                .Add("clave", clave)
                .Add("activos", 0)
                .ExecuteAsync();
        }

        [Route("catalogos/get({clave})")]
        [HttpGet]
        public async Task<ActionResult> GetAllActivos(string clave)
        {
            return await Get("/CatalogosGeneralesValores/GetByCatalogo")
                .Add("clave", clave)
                .Add("activos", 1)
                .ExecuteAsync();
        }

        //[Route("catalogos/exportar({clave})")]
        //[HttpGet]
        //public async Task<ActionResult> Exportar(string clave)
        //{
        //    dynamic obj = await Get("/CatalogosGeneralesValores/GetByCatalogo")
        //        .Add("clave", clave)
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = clave + ".xlsx";
        //    configuracion.NombreHojaTrabajo = clave;
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

        //    return new Excel().ConvertirAExcel(obj, configuracion);



        //}

        [Route("catalogos/imprimir({clave})")]
        [HttpGet]
        public async Task<ActionResult> Imprimir(string clave)
        {
            ViewBag.Data = await Get("/CatalogosGeneralesValores/GetByCatalogo")
                .Add("clave", clave)
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogosGenerales.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        #region AGRUPADOR

        [HttpPost]
        public async Task<ActionResult> SearchSeccion(string search)
        {
            return await Get("/CatalogosGeneralesValores/Search")
                .Add("clave", "AGRUPADOR")
                .Add("nombre", search)
                .Add("activos", 1)
                .ExecuteAsync();
        }

        #endregion AGRUPADOR
    }
}