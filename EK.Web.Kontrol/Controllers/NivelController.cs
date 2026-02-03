using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;


using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;

namespace EK.Web.Kontrol.Controllers
{
    [Authorize]
    public class NivelController : EK.Common.BaseKontroller
    {
        public NivelController() : base()
        { }

        [HttpPut]
        public async Task<ActionResult> Guardar()
        {
            var nivel = base.GetInputData();

            return await Get("/Niveles/Save")
                .Add("nivel", nivel)
                .ExecuteAsync();
        }

        [Route("niveles/configuracion/guardar")]
        [HttpPut]
        public async Task<ActionResult> GuardarConfiguracion()
        {
            var input = base.GetInputData();

            return await Get("/Niveles/SaveConfiguracion").Add("configuracion", input).ExecuteAsync();
        }

        [Route("niveles/{activos = 0}")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos = 0)
        {
            return await Get("/Niveles/GetAll")
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("niveles/kv")]
        [HttpGet]
        public async Task<ActionResult> GetKV()
        {
            return await Get("/Niveles/GetKV").ExecuteAsync();
        }

        [Route("niveles({id})/configuracion({idModulo})")]
        [HttpGet]
        public async Task<ActionResult> GetConfiguracion(int id, int idModulo)
        {
            return await Get("/Niveles/GetConfiguracion")
                .Add("idNivel", id)
                .Add("idModulo", idModulo)
                .ExecuteAsync();
        }

        [Route("niveles({id})")]
        [Route("Niveles/GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Niveles/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Search(string search)
        {
            return await Get("/Niveles/Search")
                .Add("nombre", search)
                .ExecuteAsync();
        }

        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Niveles/GetAll").Add("activos", 0).ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Niveles.xlsx";
        //    configuracion.NombreHojaTrabajo = "Niveles";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nivel", Campo = "Nivel" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        [HttpGet]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/Niveles/GetAll").Add("activos", 0).ExecuteAsync<JToken>();
            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoNiveles.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }
    }
}
