using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;
namespace EK.Web.Kontrol.Controllers
{
    public class ConfigurarParametrosController : EK.Common.BaseKontroller
    {
        public ConfigurarParametrosController()
            : base()
        {
        }

        [Route("configurarparametrosall({modulo}/{compania})")]
        [HttpGet]
        public ActionResult GetAll(int idmodulo = 0, int idcompania = 0)
        {
            return Get("/ConfigurarParametros/GetAll")
                 .Add("idmodulo", idmodulo)
                 .Add("idcompania", idcompania)
                 .Execute();
        }

        [Route("configurarparametros")]
        [Route("configurarparametros({idmodulo}/{idcompania})")]
        [Route("configurarparametros/modulo({idmodulo})")]
        [Route("configurarparametros/compania({idcompania})")]
        [HttpGet]
        public ActionResult Get(int idmodulo = 0, int idcompania = 0)
        {
            return Get("/ConfigurarParametros/Get")
                 .Add("idmodulo", idmodulo)
                 .Add("idcompania", idcompania)
                 .Execute();
        }

        [Route("ConfigurarParametros({id})")]
        [Route("ConfigurarParametros/GetById/{id}")]
        [HttpGet]
        public ActionResult GetById(int id)
        {
            return Get("/ConfigurarParametros/GetById")
                .Add("id", id)
                .Execute();
        }

        [HttpPost]
        public ActionResult Search(string search)
        {
            return Get("/ConfigurarParametros/Search")
                .Add("nombre", search)
                .Execute();
        }

        [HttpPut]
        public ActionResult Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return Get("/ConfigurarParametros/Save")
                .Add("configurarparametro", input)
                .Execute();
        }

        [Route("configurarparametros/history")]
        public ActionResult GetHistory()
        {
            return Get("/ConfigurarParametros/GetHistory")
                .Add("top", 25)
                .Execute();
        }

        [Route("configurarparametros/history({id})")]
        public ActionResult GetHistoryById(string id)
        {
            return Get("/ConfigurarParametros/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .Execute();
        }

        //public ActionResult Exportar()
        //{
        //    int idmodulo = System.Convert.ToInt32(Request.QueryString["idmodulo"].ToString());
        //    int idcompania = System.Convert.ToInt32(Request.QueryString["idcompania"].ToString());

        //    dynamic obj = Get("/ConfigurarParametros/GetAll")
        //         .Add("idmodulo", idmodulo)
        //         .Add("idcompania", idcompania)
        //         .Execute<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Configuracion_Parametros.xlsx";
        //    configuracion.NombreHojaTrabajo = "ConfiguracionParametros";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Sección", Campo = "Parametro.Secciones.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Parámetro", Campo = "Parametro.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Valor", Campo = "Valor" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        public ActionResult Imprimir(int idmodulo, int idcompania)
        {
            ViewBag.Data = Get("/ConfigurarParametros/GetAll")
                 .Add("idmodulo", idmodulo)
                 .Add("idcompania", idcompania)
                 .Execute<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoConfigurarParametros.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }
    }
}
