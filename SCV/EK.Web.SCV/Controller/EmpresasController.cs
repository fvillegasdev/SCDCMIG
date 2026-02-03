using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.SCV.Controller
{
    public class EmpresasController : EK.Common.BaseKontroller
    {
        [Route("Empresas({activos})")]
        [Route("Empresas/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        {
            return await Get("/Empresas/GetAll")
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("Empresas({id})")]
        [Route("Empresas/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Empresas/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("Empresas/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            try {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return await Get("/Empresas/Save")
                .Add("item", input)
                .ExecuteAsync();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/Empresas/GetAll")
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Empresas.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Empresas/GetAll")
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Empresas.xlsx";
        //    configuracion.NombreHojaTrabajo = "Empresas";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Empresas";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Empresa", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "RFC", Campo = "RFC" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "NPR", Campo = "NPR" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Localidad", Campo = "Localidad.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}