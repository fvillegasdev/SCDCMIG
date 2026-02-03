using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using Newtonsoft.Json.Linq;
using EK.Common.Exportacion;


namespace EK.Web.SCV.Controller
{
    public class ProcesosController : EK.Common.BaseKontroller
    {
        private const string ModuloEK = "SCV"; // este es modulo que se esta trabajando
        private const string RutaEK = ModuloEK + "/Procesos"; // esto es la ruta base del modulo, con esta se permite enlazar el REACT con el MVC .net
        private const string EnlaceProcesosEK = "/"+ModuloEK + "Procesos"; // permite establecer el enlace con los procesos
        private const string archivo_exp = "Procesos"; // esta variabla se ocupa para el nombre del archivo de excel y para el pdf

        [Route(RutaEK + "({activos})")]
        [Route(RutaEK + "/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        { 
           // return await Get(EnlaceProcesosEK + "/GetAll").Add("activos", activos).ExecuteAsync();
            return await Get(EnlaceProcesosEK+"/GetAll").Add("activos", activos).ExecuteAsync();
        }

        [Route(RutaEK + "/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get(EnlaceProcesosEK + "/GetById").Add("id", id).ExecuteAsync();
        }

        [Route(RutaEK + "/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return await Get(EnlaceProcesosEK + "/Save").Add("item", input).ExecuteAsync();
        }

        [Route(RutaEK + "/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get(EnlaceProcesosEK + "/GetAll").Add("activos", 0).ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/" + ModuloEK + "/Reportes/" + archivo_exp + ".cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //[Route(RutaEK + "/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get(EnlaceProcesosEK + "/GetAll").Add("activos", 0).ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = archivo_exp+".xlsx";
        //    configuracion.NombreHojaTrabajo = archivo_exp;
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Responsable", Campo = "Responsable" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Evento", Campo = "Evento" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "AccionProceso", Campo = "AccionProceso.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}