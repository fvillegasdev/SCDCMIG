using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using web = System.Web.Http;

namespace EK.Web.SCV.Controller
{
    public class ListaPreciosController : EK.Common.BaseKontroller
    {
        [Route("listaPrecios({activos})")]
        [Route("listaPrecios/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        {
            return await Get("/ListaPrecios/GetAll")
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("listaPrecios/RequestAuthorize")]
        [HttpPost]
        public async Task<ActionResult> RequestAuthorize()
        {
            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string model = JsonConvert.SerializeObject(data.model);
            string idVersionLP = JsonConvert.SerializeObject(data.ID);
            return await Get("/ListaPrecios/RequestAuthorize")
              .Add("idVersionLP", idVersionLP)
              .ExecuteAsync();
        }

        //[Route("listaPrecios/GetById/{id}")]
        //public async Task<ActionResult> GetById(int id)
        //{
        //    return await Get("/ListaPrecios/GetById")
        //        .Add("id", id)
        //        .ExecuteAsync();
        //}

        //[Route("listaPrecios/GetById/Ubicaciones/{id}")]
        //public async Task<ActionResult> GetByUbicacionId(int id)
        //{
        //    return await Get("/ListaPrecios/GetByUbicacionId")
        //        .Add("id", id)
        //        .ExecuteAsync();
        //}

        //[Route("listaPrecios/Search")]
        //[HttpPost]
        //public async Task<ActionResult> Search(
        //    [web.FromUri] int? idDesarrollo,
        //    [web.FromUri] int? idPrototipo, 
        //    [web.FromUri] int? idEstatusUbicacion, 
        //    [web.FromUri] int? idEstatusExpediente)
        //{
        //    return await Get("/ListaPrecios/Search")
        //        .Add("idDesarrollo", idDesarrollo)
        //        .Add("idPrototipo", idPrototipo)
        //        .Add("idEstatusUbicacion", idEstatusUbicacion)
        //        .Add("idEstatusExpediente", idEstatusExpediente)
        //        .ExecuteAsync();
        //}

        [Route("listaPrecios/SaveListaPrecios")]
        [HttpPut]
        public async Task<ActionResult> SaveListaPrecios()
        {
            var input = base.GetInputData();
            try
            {
                return await Get("/ListaPrecios/SaveVersion")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        //[Route("listaPrecios/Imprimir")]
        //[HttpGet]
        //public async Task<ActionResult> Imprimir(
        //    [web.FromUri] int? idDesarrollo,
        //    [web.FromUri] int? idPrototipo,
        //    [web.FromUri] int? idEstatusUbicacion,
        //    [web.FromUri] int? idEstatusExpediente)
        //{
        //    ViewBag.Data = await Get("/ListaPrecios/Search")
        //        .Add("idDesarrollo", idDesarrollo)
        //        .Add("idPrototipo", idPrototipo)
        //        .Add("idEstatusUbicacion", idEstatusUbicacion)
        //        .Add("idEstatusExpediente", idEstatusExpediente)
        //        .ExecuteAsync<JToken>();

        //    return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/ListaPrecios.cshtml")
        //    {
        //        PageSize = Rotativa.Options.Size.Letter,
        //        PageOrientation = Rotativa.Options.Orientation.Portrait,
        //        PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
        //    };
        //}



        [Route("listaPrecios/id")]
        [HttpPost]
        public async Task<ActionResult> GetById()
        {
            dynamic obj = base.GetInputObject();

            return await Get($"/ListaPrecios/GetVersionById")
                .Add("id", obj.id)
                .ExecuteAsync();
        }

        //[Route("listaPrecios/Exportar")]
        //public async Task<ActionResult> Exportar(
        //    [web.FromUri] int? idDesarrollo,
        //    [web.FromUri] int? idPrototipo,
        //    [web.FromUri] int? idEstatusUbicacion,
        //    [web.FromUri] int? idEstatusExpediente)
        //{
        //    dynamic obj = await Get("/ListaPrecios/Search")
        //        .Add("idDesarrollo", idDesarrollo)
        //        .Add("idPrototipo", idPrototipo)
        //        .Add("idEstatusUbicacion", idEstatusUbicacion)
        //        .Add("idEstatusExpediente", idEstatusExpediente)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "ListaPrecios.xlsx";
        //    configuracion.NombreHojaTrabajo = "ListaPrecios";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Ubicacion", Campo = "Ubicacion.Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Prototipo", Campo = "Ubicacion.Prototipo.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Vigencia", Campo = "Vigencia" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Valor Actual", Campo = "ValorActual" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Valor Autorizado", Campo = "ValorAutorizado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Total Caracteristicas", Campo = "TotalCaracteristicas" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Precio Base", Campo = "PrecioBase" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
