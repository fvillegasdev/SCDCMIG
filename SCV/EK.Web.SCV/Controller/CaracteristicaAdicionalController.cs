//using EK.Common.ExportarExcel;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.SCV.Controller
{
    public class CaracteristicaAdicionalController : EK.Common.BaseKontroller
    {
        //[Route("CaracteristicaAdicional({activos})")]
        //[Route("CaracteristicaAdicional/GetAll({activos})")]
        //[HttpGet]
        //public async Task<ActionResult> GetAll(int activos)
        //{
        //    return await Get("/CaracteristicaAdicional/GetAll")
        //        .Add("activos", activos)
        //        .ExecuteAsync();
        //}

        #region CaracteristicasDDL

        //[Route("CaracteristicaAdicional/GetAllByEntidad({activos},{claveEntidad})")]
        //[HttpGet]
        //public async Task<ActionResult> GetAllByEntidad(int activos, string claveEntidad)
        //{
        //    return await Get("/CaracteristicaAdicional/GetAll")
        //        .Add("activos", activos)
        //        .Add("claveEntidad", claveEntidad)
        //        .ExecuteAsync();
        //}


        [Route("CaracteristicaAdicional/GetAllByVentaOpcional/{parametros}")]
        [HttpGet]
        public async Task<ActionResult> GetAllByVentaOpcional(string parametros)
        {
            var obj = base.GetEncodedDictionary(parametros);
            return await Get("/CaracteristicaAdicional/GetAllByVentaOpcional")
                .Add("parametros", obj)
                .ExecuteAsync();
            //.Add("idUbicacion", idUbicacion)
            //.Add("idFinanciamiento", idFinanciamiento)
            //.Add("ventaOpcional", false)

        }

        #endregion

        #region CaracteristicasComponent

        [Route("CaracteristicaAdicional/GetCaracteristicas/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetEntidadCaracteristicas(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/CaracteristicaAdicional/GetCaracteristicas")
                 .Add("parametros", obj)
                .ExecuteAsync();
        }

        #endregion

        //[Route("CaracteristicaAdicional({id})")]
        //[Route("CaracteristicaAdicional/GetById/{id}")]
        //public async Task<ActionResult> GetById(int id)
        //{
        //    return await Get("/CaracteristicaAdicional/GetById")
        //        .Add("id", id)
        //        .ExecuteAsync();
        //}

        //[Route("CaracteristicaAdicional/Save")]
        //[HttpPut]
        //public async Task<ActionResult> Save()
        //{
        //    Request.InputStream.Position = 0;
        //    var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

        //    return await Get("/CaracteristicaAdicional/Save")
        //        .Add("item", input)
        //        .ExecuteAsync();
        //}

        //[Route("CaracteristicaAdicional/Imprimir")]
        //public async Task<ActionResult> Imprimir()
        //{
        //    ViewBag.Data = await Get("/CaracteristicaAdicional/GetAll")
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/CaracteristicaAdicional.cshtml")
        //    {
        //        PageSize = Rotativa.Options.Size.Letter,
        //        PageOrientation = Rotativa.Options.Orientation.Portrait,
        //        PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
        //    };
        //}

        //[Route("CaracteristicaAdicional/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/CaracteristicaAdicional/GetAll")
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "CaracteristicaAdicional.xlsx";
        //    configuracion.NombreHojaTrabajo = "CaracteristicaAdicional";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Tipo", Campo = "TipoCaracteristica.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Tipo Entidad", Campo = "TipoEntidad.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Escriturado", Campo = "Escriturado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Exportar().ConvertirAExcel(obj, configuracion);
        //}
    }
}