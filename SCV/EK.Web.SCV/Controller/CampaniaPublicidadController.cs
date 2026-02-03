using System;
using System.Threading.Tasks;
using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EK.Web.SCV
{
    public class CampaniaPublicidadController : EK.Common.BaseKontroller
    {
        [Route("campaniapublicidad({activos})")]
        [Route("CampaniaPublicidad/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        {
            return await Get("/CampaniaPublicidad/GetAll")
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("CampaniaPublicidad/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/CampaniaPublicidad/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("CampaniaPublicidad/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/CampaniaPublicidad/Save")
                .Add("item", input)
                .ExecuteAsync();
        }

        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/CampaniaPublicidad/GetAll")
                .Add("activos", 0)              
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/CampaniaPublicidad.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }


        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/CampaniaPublicidad/GetAll")
        //      .Add("activos", 0)
        //     .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "CampaniaPublicidad.xlsx";
        //    configuracion.NombreHojaTrabajo = "CampaniaPublicidad";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Medio Publicidad", Campo = "MedioPublicidad.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Fecha Inicial", Campo = "FechaInicial" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Fecha Final", Campo = "FechaFinal" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}

    }
}
