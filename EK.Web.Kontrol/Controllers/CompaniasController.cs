using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public partial class CompaniasController
        : EK.Common.BaseKontroller
    {
        public CompaniasController()
            : base()
        {
        }

        [Route("compania({id})")]
        [Route("Companias/GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Compañias/GetById")
                .Add("id", id).ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Search(string search)
        {
            return await Get("/Compañias/Search")
                .Add("nombre", search).ExecuteAsync();
        }

        [Route("cliente({idcliente})/companias")]
        [HttpGet]
        public async Task<ActionResult> GetByIdCliente(int idcliente)
        {
            return await Get("/Compañias/GetByIdCliente")
                .Add("idCliente", idcliente)
                .ExecuteAsync();
        }

        [Route("companias/key-value")]
        [Route("Companias/KV")]
        [HttpGet]
        public async Task<ActionResult> KV()
        {
            return await Get("/Compañias/GetKV").ExecuteAsync();
        }

        [HttpPut]
        public async Task<ActionResult> Save()
        {
            var input = base.GetInputData();

            return await Get("/Compañias/Save")
                .Add("compania", input)
                .ExecuteAsync();
        }

        [HttpGet]
        public async Task<ActionResult> Imprimir(int cliente, bool isENKUser)
        {
            ViewBag.Data = isENKUser ? await Get("/Compañias/GetAll")
                                             .Add("idcliente", cliente)
                                             .Add("activos", 0)
                                             .Add("todos", 0)
                                             .ExecuteAsync<JToken>() :
                                         await Get("/Compañias/GetAll")
                                             .Add("activos", 0)
                                             .Add("todos", 0)
                                             .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoCompanias.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //public async Task<ActionResult> Exportar()
        //{
        //    bool isENKUser = Convert.ToBoolean(Request.QueryString["isEnkUser"]);
        //    int cliente = Convert.ToInt32(Request.QueryString["cliente"].ToString());
        //    dynamic obj = isENKUser ? await Get("/Compañias/GetAll")
        //                                    .Add("idcliente", cliente)
        //                                    .Add("activos", 0)
        //                                    .Add("todos", 0)
        //                                    .ExecuteAsync<JToken>() :
        //                                await Get("/Compañias/GetAll")
        //                                    .Add("activos", 0)
        //                                    .Add("todos", 0)
        //                                    .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Companias.xlsx";
        //    configuracion.NombreHojaTrabajo = "Companias";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "RFC", Campo = "Rfc" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        [Route("compania/vivienda")]
        [Route("Companias/GetVivienda")]
        [HttpGet]
        public async Task<ActionResult> GetVivienda()
        {
            return await Get("/Companias/GetVivienda")
                .ExecuteAsync();
        }
    }
}