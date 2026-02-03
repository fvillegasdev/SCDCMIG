using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.SCV
{
    public class InstitucionesController : EK.Common.BaseKontroller
    {
        [Route("instituciones({id},{activos})")]
        [Route("Instituciones/GetAll({id},{activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int id, int activos)
        {
            return await Get("/Instituciones/GetAll")
                .Add("id", id)
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("instituciones({id})")]
        [Route("Instituciones/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Instituciones/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("instituciones({id})")]
        [Route("instituciones/GetEsquemasById/{id}")]
        public async Task<ActionResult> GetEsquemasById(int id)
        {
            return await Get("/instituciones/GetEsquemasById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("Instituciones/GetInstitucionesEsquema")]
        public async Task<ActionResult> GetInstitucionesEsquema()
        {
            return await Get("/Instituciones/GetInstitucionesEsquema")
                .ExecuteAsync();
        }

        [Route("Instituciones/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Instituciones/Save")
                .Add("item", input)
                .ExecuteAsync();
        }

        [Route("Instituciones/history")]
        public async Task<ActionResult> GetHistory()
        {
            return await Get("/Instituciones/GetHistory")
                .Add("top", 25)
                .ExecuteAsync();
        }

        [Route("Instituciones/history({id})")]
        public async Task<ActionResult> GetHistoryById(string id)
        {
            return await Get("/Instituciones/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .ExecuteAsync();
        }

        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/Instituciones/GetAll")
                 .Add("id", 0)
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Instituciones.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Instituciones/GetAll")
        //        .Add("id", 0)
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Instituciones.xlsx";
        //    configuracion.NombreHojaTrabajo = "Instituciones";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
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