using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EK.Web.SCV
{
    public class SegmentosVigenciasController : EK.Common.BaseKontroller
    {
        [Route("segmentosvigencias({id},{activos})")]
        [Route("SegmentosVigencias/GetAll({id},{activos})")]
        [HttpGet]
        public ActionResult GetAll(int id, int activos)
        {
            return Get("/SegmentosVigencias/GetAll")
                .Add("id", id)
                .Add("activos", activos)
                .Execute();
        }

        [Route("segmentosvigencias({id})")]
        [Route("SegmentosVigencias/GetById/{id}")]
        public ActionResult GetById(int id)
        {
            return Get("/SegmentosVigencias/GetById")
                .Add("id", id)
                .Execute();
        }

        [Route("SegmentosVigencias/Save")]
        [HttpPut]
        public ActionResult Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return Get("/SegmentosVigencias/Save")
                .Add("item", input)
                .Execute();
        }

        [Route("SegmentosVigencias/history")]
        public ActionResult GetHistory()
        {
            return Get("/SegmentosVigencias/GetHistory")
                .Add("top", 25)
                .Execute();
        }

        [Route("SegmentosVigencias/history({id})")]
        public ActionResult GetHistoryById(string id)
        {
            return Get("/SegmentosVigencias/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .Execute();
        }

        public ActionResult Imprimir()
        {
            ViewBag.Data = Get("/SegmentosVigencias/GetAll")
                 .Add("id", 0)
                .Add("activos", 0)
                .Execute<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/SegmentosVigencias.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //public ActionResult Exportar()
        //{
        //    dynamic obj = Get("/SegmentosVigencias/GetAll")
        //        .Add("id", 0)
        //        .Add("activos", 0)
        //        .Execute<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "SegmentosVigencias.xlsx";
        //    configuracion.NombreHojaTrabajo = "SegmentosVigencias";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "ID", Campo = "ID" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Segmento de Vivienda", Campo = "Segmento.Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Vigencia", Campo = "Vigencia" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Rango de precio inicial", Campo = "PrecioInicial" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Rango de precio final", Campo = "PrecioFinal" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}
    }
}