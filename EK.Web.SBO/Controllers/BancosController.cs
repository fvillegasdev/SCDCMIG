using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using EK.Common.Exportacion;
using System.Collections.Generic;

namespace EK.Web.SBO.Controllers
{
    public class BancosController : EK.Common.BaseKontroller
    {
        public BancosController()
            : base()
        {
        }

        [Route("bancos")]
        [Route("Bancos/GetAll")]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return await Get("/Bancos/GetAll").ExecuteAsync();
        }

        [Route("bancos")]
        [Route("Bancos/compania/{idCompania}")]
        [HttpGet]
        public async Task<ActionResult> compania(int idCompania)
        {
            return await Get("/Bancos/compania")
                    .Add("idCompania", idCompania)
                    .ExecuteAsync();
        }

        [Route("bancos({id})")]
        [Route("Bancos/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Bancos/GetById").Add("id", id).ExecuteAsync();
        }

        [Route("bancos/update")]
        [Route("Bancos/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Bancos/Update")
                .Add("banco", input)
                .ExecuteAsync();
        }

        [Route("bancos/insert")]
        [HttpPut]
        public async Task<ActionResult> Insert()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Bancos/Insert")
                .Add("banco", input)
                .ExecuteAsync();
        }

        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/Bancos/GetAll").ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SBO/Reportes/CatalogoBancos.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        [Route("bancos/history")]
        public async Task<ActionResult> GetHistory()
        {
            return await Get("/Bancos/GetHistory")
                .Add("top", 25)
                .ExecuteAsync();
        }

        [Route("bancos/history({id})")]
        public async Task<ActionResult> GetHistoryById(string id)
        {
            return await Get("/Bancos/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .ExecuteAsync();
        }
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = Get("/Bancos/GetAll").ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Bancos.xlsx";
        //    configuracion.NombreHojaTrabajo = "Bancos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripción", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Sucursal", Campo = "Sucursal" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Tipo Banco", Campo = "BancoExtranjero" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}
    }
}
