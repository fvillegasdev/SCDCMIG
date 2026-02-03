using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public class ParametrosController : EK.Common.BaseKontroller
    {
        public ParametrosController()
            : base()
        {
        }

        [Route("Parametros/Get/{idmodulo}/{idambito}")]
        [HttpGet]
        public ActionResult GetAll(int idmodulo, int idambito)
        {
            return Get("/Parametros/GetAll")
                 .Add("idmodulo", idmodulo)
                 .Add("idambito", idambito)
                 .Execute();
        }

        [Route("Parametros({id})")]
        [Route("Parametros/GetById/{id}")]
        [HttpGet]
        public ActionResult GetById(int id)
        {
            return Get("/Parametros/GetById")
                .Add("id", id)
                .Execute();
        }

        [HttpPost]
        public ActionResult Search(string search)
        {
            return Get("/Parametros/Search")
                .Add("nombre", search)
                .Execute();
        }

        [HttpPut]
        public ActionResult Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return Get("/Parametros/Save")
                .Add("parametro", input)
                .Execute();
        }

        [Route("Parametros/history")]
        public ActionResult GetHistory()
        {
            return Get("/Parametros/GetHistory")
                .Add("top", 25)
                .Execute();
        }

        [Route("Parametros/history({id})")]
        public ActionResult GetHistoryById(string id)
        {
            return Get("/Parametros/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .Execute();
        }

        //public ActionResult Exportar()
        //{
        //    int idmodulo = System.Convert.ToInt32(Request.QueryString["idmodulo"].ToString());
        //    int idambito = System.Convert.ToInt32(Request.QueryString["idambito"].ToString());

        //    dynamic obj = Get("/Parametros/GetAll")
        //         .Add("idmodulo", idmodulo)
        //         .Add("idambito", idambito)
        //         .Execute<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Parametros.xlsx";
        //    configuracion.NombreHojaTrabajo = "Parametros";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Sección", Campo = "Secciones.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Parámetro", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Tipo Dato", Campo = "TipoDato.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripción", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        public ActionResult Imprimir(int idmodulo, int idambito)
        {
            ViewBag.Data = Get("/Parametros/GetAll")
                 .Add("idmodulo", idmodulo)
                 .Add("idambito", idambito)
                 .Execute<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoParametros.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }
    }
}