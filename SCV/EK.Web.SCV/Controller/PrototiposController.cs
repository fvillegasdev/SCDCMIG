using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;

namespace EK.Web.SCV.Controller
{
    public class PrototiposController : EK.Common.BaseKontroller
    {
        [Route("prototipos/{tipo}/{activos}")]
        [Route("prototipos/{tipo}")]
        [Route("Prototipos/GetAll({tipo},{activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(string tipo, string activos)
        {
            int tipoConsulta = 0;
            var consultarActivos = activos == "activos";

            tipo = tipo.Trim().ToLowerInvariant();
            if (tipo == "catalogo" || tipo == "kv")
            {
                if (tipo == "kv")
                {
                    tipoConsulta = 1;
                }

                    return await Get("/Prototipos/GetAll")
                    .Add("activos", consultarActivos)
                    .Add("kv", tipoConsulta)
                    .ExecuteAsync();
                
            }
            else
            {
                return HttpNotFound();
            }
        }

        [Route("Prototipos/all/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetAllByFiltros(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Prototipos/Get")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("prototipos({id})")]
        [Route("Prototipos/GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Prototipos/GetById")
            .Add("id", id)
            .ExecuteAsync();
        }

        [Route("Prototipos/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Prototipos/Save")
                .Add("item", input)
                .ExecuteAsync();
        }

        [Route("Prototipos/id/")]
        public async Task<ActionResult> GetPrototipoById()
        {
            dynamic obj = base.GetInputObject();

            return await Get("/Prototipos/GetByPrototipoId")
                .Add("id", obj.id)
                .ExecuteAsync();
        }

        [Route("Prototipos/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/Prototipos/GetAll")
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Prototipos.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //[Route("Prototipos/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Prototipos/GetAll")
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Prototipos.xlsx";
        //    configuracion.NombreHojaTrabajo = "Prototipos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripcion", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
