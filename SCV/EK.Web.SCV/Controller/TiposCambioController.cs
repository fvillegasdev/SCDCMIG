using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace EK.Web.SCV.Controller
{
    public class TiposCambioController : EK.Common.BaseKontroller
    {
        [Route("tiposcambio({activos})")]
        [Route("TiposCambio/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll( int activos)
        {
            return await Get("/TiposCambio/GetAll").Add("activos", activos).ExecuteAsync();
        }

        [Route("TiposCambio/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/TiposCambio/GetById").Add("id", id).ExecuteAsync();
        }

        [Route("TiposCambio/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            //Request.InputStream.Position = 0;
             var input = base.GetInputData();

            return await Get("/TiposCambio/Save").Add("item", input) .ExecuteAsync();
        }

        [Route("TiposCambio/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/TiposCambio/GetAll").Add("activos", 0).ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/TiposCambio.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //[Route("TiposCambio/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/TiposCambio/GetAll").Add("activos", 0).ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "TiposCambio.xlsx";
        //    configuracion.NombreHojaTrabajo = "TiposCambio";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Moneda", Campo = "Moneda.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Fecha", Campo = "Fecha" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Tipo de Cambio", Campo = "TiposCambio" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}
    }
}
