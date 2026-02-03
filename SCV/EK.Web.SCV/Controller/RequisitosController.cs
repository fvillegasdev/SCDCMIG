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
    public class RequisitosController : EK.Common.BaseKontroller
    {
        [Route("scv/requisitos/caracteristicas/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetCaracteristicas(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Requisitos/GetCaracteristicas")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        //[Route("requisitos({id})")]
        //[Route("requisitos/GetById/{id}")]
        //public async Task<ActionResult> GetById(int id)
        //{
        //    return await Get("/Requisitos/GetById")
        //        .Add("id", id)
        //        .ExecuteAsync();
        //}

        //[Route("requisitos/Save")]
        //[HttpPut]
        //public async Task<ActionResult> Save()
        //{
        //    Request.InputStream.Position = 0;
        //    var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

        //    try
        //    {
        //        return await Get("/Requisitos/Save")
        //            .Add("item", input)
        //            .ExecuteAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //[Route("requisitos/Imprimir")]
        //public async Task<ActionResult> Imprimir()
        //{
        //    ViewBag.Data = await Get("/Requisitos/GetAll")
        //        .Add("activos", 1)
        //        .ExecuteAsync<JToken>();

        //    return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Requisitos.cshtml")
        //    {
        //        PageSize = Rotativa.Options.Size.Letter,
        //        PageOrientation = Rotativa.Options.Orientation.Portrait,
        //        PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
        //    };
        //}

        //[Route("requisitos/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Requisitos/GetAll")
        //        .Add("activos", 1)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Requisitos.xlsx";
        //    configuracion.NombreHojaTrabajo = "Requisitos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripcion", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Observaciones", Campo = "Observaciones" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Tipo Requisito", Campo = "TipoRequisito.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
