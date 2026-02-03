using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using EK.Modelo.Kontrol;
using Newtonsoft.Json.Linq;
using EK.Common.Exportacion;
using System.Collections.Generic;

namespace EK.Web.Kontrol.Controllers
{
    public class ModulosController : EK.Common.BaseKontroller
    {
        public ModulosController() : base()
        {
        }

        [Route("opciones/acciones/{clave}")]
        [HttpGet]
        public async Task<ActionResult> GetAccionesPorModulo(string clave)
        {
            return await Get("/Modulos/GetAccionesPorOpcion").Add("clave", clave).ExecuteAsync();
        }

        [Route("modulos")]
        [Route("Modulos/GetAll")]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return await Get("/Modulos/GetAll").ExecuteAsync();
        }

        [Route("modulos({id})")]
        [Route("Modulos/GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Modulos/GetById")
                        .Add("id", id)
                        .ExecuteAsync();
        }

        [Route("modulos({id})/opciones")]
        [Route("Modulos/GetOpciones/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetOpciones(int id)
        {
            return await Get("/Modulos/GetOpciones")
                        .Add("idModulo", id)
                        .ExecuteAsync();
        }


        [HttpPut]
        public async Task<ActionResult> Save()
        {
            var input = base.GetInputData();

            return await Get("/Modulos/Save")
                .Add("modulo", input)
                .ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Search(string search)
        {
            return await Get("/Modulos/Search")
                .Add("nombre", search)
                .ExecuteAsync();
        }

        [Route("modulos/key-value")]
        [Route("Modulos/KV")]
        [HttpGet]
        public async Task<ActionResult> KVAgrupador()
        {
            return await Get("/Modulos/GetKV")
                .ExecuteAsync();
        }

        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Modulos/GetAll").ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Modulos.xlsx";
        //    configuracion.NombreHojaTrabajo = "Modulos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
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
            ViewBag.Data = await Get("/Modulos/GetAll").ExecuteAsync<JToken>();
            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoModulos.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }
    }
}
