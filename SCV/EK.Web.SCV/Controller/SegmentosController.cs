using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EK.Web.SCV
{
    public class SegmentosController : EK.Common.BaseKontroller
    {
        [Route("segmentos({id},{activos})")]
        [Route("Segmentos/GetAll({id},{activos})")]
        [HttpGet]
        public ActionResult GetAll(int id, int activos)
        {
            return Get("/Segmentos/GetAll")
                .Add("id", id)
                .Add("activos", activos)
                .Execute();
        }

        [Route("segmentos({id})")]
        [Route("Segmentos/GetById/{id}")]
        public ActionResult GetById(int id)
        {
            return Get("/Segmentos/GetById")
                .Add("id", id)
                .Execute();
        }

        [Route("Segmentos/Save")]
        [HttpPut]
        public ActionResult Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return Get("/Segmentos/Save")
                .Add("item", input)
                .Execute();
        }

        [Route("Segmentos/history")]
        public ActionResult GetHistory()
        {
            return Get("/Segmentos/GetHistory")
                .Add("top", 25)
                .Execute();
        }

        [Route("Segmentos/history({id})")]
        public ActionResult GetHistoryById(string id)
        {
            return Get("/Segmentos/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .Execute();
        }

        public ActionResult Imprimir()
        {
            ViewBag.Data = Get("/Segmentos/GetAll")
                 .Add("id", 0)
                .Add("activos", 0)
                .Execute<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Segmentos.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //public ActionResult Exportar()
        //{
        //    dynamic obj = Get("/Segmentos/GetAll")
        //        .Add("id", 0)
        //        .Add("activos", 0)
        //        .Execute<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Segmentos.xlsx";
        //    configuracion.NombreHojaTrabajo = "Segmentos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "ID", Campo = "ID" });
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