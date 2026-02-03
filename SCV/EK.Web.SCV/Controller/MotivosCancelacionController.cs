using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace EK.Web.SCV.Controller
{
    public class MotivosCancelacionController : EK.Common.BaseKontroller
    {
        [Route("motivos({id},{activos})")]
        [Route("motivos/GetAll({id},{activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int id, int activos)
        {
            return await Get("/MotivosCancelacion/GetAll")
                .Add("id", id)
                .Add("activos", activos)
                .ExecuteAsync();
        }


        [Route("motivos/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/MotivosCancelacion/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("motivos/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return await Get("/MotivosCancelacion/Save")
                .Add("item", input)
                .ExecuteAsync();
        }

        [Route("motivos/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/MotivosCancelacion/GetAll")
                .Add("id", 0)
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/MotivosCancelacion.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //[Route("motivos/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/MotivosCancelacion/GetAll")
        //        .Add("id", 0)
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "MotivosCancelacion.xlsx";
        //    configuracion.NombreHojaTrabajo = "MotivosCancelacion";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "ID", Campo = "ID" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripcion", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Abrev", Campo = "Abrev" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Porcentaje", Campo = "Porcentaje" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
