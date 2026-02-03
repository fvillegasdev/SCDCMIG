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
    public class ConceptosPagoController : EK.Common.BaseKontroller
    {
        [Route("ConceptosPago/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        {
            return await Get("/ConceptosPago/GetAll")
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("conceptosPago/tipo({tipo})")]
        [HttpGet]
        public async Task<ActionResult> GetPorTipo(string tipo)
        {
            if (tipo == "todos")
            {
                var d = new Dictionary<string, object>();
                d.Add("activos", 0);

                return await Get("/ConceptosPago/GetAll")
                .Add("parametros", d)
                .ExecuteAsync();
            }
            else
            {
                return await Get("/ConceptosPago/GetPorTipo")
                .Add("tipo", tipo)
                .ExecuteAsync();
            }
        }

        [Route("ConceptosPago({id})")]
        [Route("ConceptosPago/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/ConceptosPago/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("ConceptosPago/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/ConceptosPago/Save")
                .Add("item", input)
                .ExecuteAsync();
        }

        [Route("ConceptosPago/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/ConceptosPago/GetAll")
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/ConceptosPago.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //[Route("ConceptosPago/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/ConceptosPago/GetAll")
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "ConceptosPago.xlsx";
        //    configuracion.NombreHojaTrabajo = "ConceptosPago";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripción", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Tipo Concepto", Campo = "TipoConceptoPago.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
