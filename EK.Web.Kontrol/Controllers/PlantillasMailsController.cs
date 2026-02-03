using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public class PlantillasMailsController : EK.Common.BaseKontroller
    {
        public PlantillasMailsController()
            : base()
        {
        }

        [Route("Plantillas/Get")]
        [HttpGet]
        public ActionResult Get()
        {
            return Get("/PlantillasMails/Get")
                 .Execute();
        }

        [Route("Plantillas/Get({id})")]
        [HttpGet]
        public ActionResult Get(int id)
        {
            return Get("/PlantillasMails/Get")
                 .Add("id", id)
                 .Execute();
        }

        [HttpPut]
        public ActionResult Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return Get("/PlantillasMails/Save")
                .Add("plantilla", input)
                .Execute();
        }

        [Route("plantillas/history")]
        public ActionResult GetHistory()
        {
            return Get("/PlantillasMails/GetHistory")
                .Add("top", 25)
                .Execute();
        }

        [Route("plantillas/history({id})")]
        public ActionResult GetHistoryById(string id)
        {
            return Get("/PlantillasMails/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .Execute();
        }

        //public ActionResult Exportar()
        //{
        //    dynamic obj = Get("/PlantillasMails/Get").Execute<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Plantillas_Mails.xlsx";
        //    configuracion.NombreHojaTrabajo = "Plantillas Mails";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripción", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}
        public ActionResult Imprimir()
        {
            ViewBag.Data = Get("/PlantillasMails/Get").Execute<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoPlantillasMails.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }


    }
}