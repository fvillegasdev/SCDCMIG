using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    [Authorize]
    public class ClasificadoresController : EK.Common.BaseKontroller
    {
        #region Tipos Clasificadores

        [Route("tiposclasificadores({activos})")]
        [HttpGet]
        public async Task<ActionResult> ObtenerTiposClasificador(int activos)
        {
            return await Get("/Clasificadores/ObtenerTiposClasificador")
                .Add("activos", activos)
                .ExecuteAsync();
        }


        [Route("tiposclasificadores/imprimir({activos})")]
        [HttpGet]
        public async Task<ActionResult> Imprimir(int activos, bool? esCatalogoGral)
        {

            ViewBag.Data = await Get("/Clasificadores/ObtenerTiposClasificador")
                .Add("activos", activos)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoTiposClasificadores.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        [Route("tiposclasificadoresentidad({claveEntidad})")]
        [HttpGet]
        public async Task<ActionResult> ObtenerTiposClasificadorXEntidad(string claveEntidad)
        {
            return await Get("/Clasificadores/ObtenerTiposClasificadorXEntidad")
                .Add("claveEntidad", claveEntidad)
                .ExecuteAsync();
        }
        [Route("clasificadoresentidad/catalogo({idTipoClasificador}/{claveentidad})")]
        [HttpGet]
        public async Task<ActionResult> ObtenerCatalogoClasificadoresXEntidad(int idTipoClasificador, string claveentidad)
        {
            return await Get("/Clasificadores/ObtenerCatalogoClasificadoresXEntidad")
                .Add("idTipoClasificador", idTipoClasificador)
                .Add("claveentidad", claveentidad)
                .ExecuteAsync();
        }
        [Route("tiposclasificadores/catalogo({clavecatalogo},{activos})")]
        [HttpGet]
        public async Task<ActionResult> ObtenerClasificadoresXTipo(string clavecatalogo, int activos)
        {
            return await Get("/Clasificadores/ObtenerClasificadoresXTipo")
                .Add("clavecatalogo", clavecatalogo)
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("tiposclasificadores/Save")]
        [HttpPost]
        public async Task<ActionResult> SaveTipoClasificador()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            string FormJson = input.ToString();

            return await Get("/Clasificadores/SaveTipoClasificador").Add("FormJson", FormJson).ExecuteAsync();
        }

        [Route("tiposClasificadores/historyTypes")]
        public async Task<ActionResult> GetTypeHistory()
        {
            return await Get("/Clasificadores/GetHistory")
                .Add("top", 25)
                .ExecuteAsync();
        }

        [Route("tiposClasificadores/historyTypes({id})")]
        public async Task<ActionResult> GetTypeHistoryById(string id)
        {
            return await Get("/Clasificadores/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .ExecuteAsync();
        }

        #endregion Tipos Clasificadores

        #region Clasificadores
        //[Route("clasificadores/entidad({claveentidad}/{identidad})")]
        //[HttpGet]
        //public async Task<ActionResult> ObtenerClasificadoresXEntidad(string claveentidad, int identidad)
        //{
        //    return await Get("/Clasificadores/ObtenerClasificadoresXEntidad")
        //        .Add("claveEntidad", claveentidad)
        //        .Add("idEntidad", identidad)
        //        .ExecuteAsync();
        //}
        //[Route("kontrol/clasificadores/{filtros}")]
        //[HttpGet]
        //public async Task<ActionResult> ObtenerClasificadoresXEntidad(string filtros)
        //{
        //    var obj = base.GetEncodedDictionary(filtros);

        //    return await Get($"/clasificadores/GetAll")
        //        .Add("parametros", obj)
        //        .ExecuteAsync();
        //}

        [Route("clasificadores/perfil")]
        [HttpGet]
        public async Task<ActionResult> ObtenerClasificadoresPorUsuarioActual()
        {
            return await Get("/Clasificadores/ObtenerClasificadoresPorUsuarioActual").ExecuteAsync();
        }


        [Route("clasificadores/guardar")]
        [HttpPost]
        public async Task<ActionResult> SaveClasificadoresXEntidad()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Clasificadores/Save")
                .Add("clasificadores", input)
                .ExecuteAsync();
        }

        [Route("clasificadores/guardarCatGeneral")]
        [HttpPost]
        public async Task<ActionResult> SaveClasificadoresCatGeneral()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Clasificadores/SaveClasificadoresCatGeneral")
                .Add("clasificadores", input)
                .ExecuteAsync();
        }
        #endregion Clasificadores

        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Clasificadores/ObtenerTiposClasificador")
        //        .Add("activos", 1)
        //        .Add("esCatalogoGral", true)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Tipos_de_Clasificadores.xlsx";
        //    configuracion.NombreHojaTrabajo = "TiposClasificadores";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "ID", Campo = "ID" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripción", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}
    }
}