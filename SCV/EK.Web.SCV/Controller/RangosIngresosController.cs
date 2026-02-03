using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace EK.Web.SCV
{
    public class RangosIngresosController : EK.Common.BaseKontroller
    {
        [Route("rangosingresos/{tipo}/{activos}")]
        [Route("rangosingresos/{tipo}")]
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

                return await Get("/RangosIngresos/GetAll")
                .Add("activos", consultarActivos)
                .Add("kv", tipoConsulta)
                .ExecuteAsync();
            }
            else
            {
                return HttpNotFound();
            }
        }

        [Route("rangosingresos({id})")]
        [Route("RangosIngresos/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/RangosIngresos/GetById")
                .Add("id", id)
                .Add("activos", 0)
                .ExecuteAsync();
        }

        [Route("rangosIngresos/Save")]
        [HttpPut]
        public async Task<ActionResult> Save(string item="")
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/RangosIngresos/Save")
                .Add("item", input)
                .ExecuteAsync();
        }

        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/RangosIngresos/GetAll")
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/RangosIngresos.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }


        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/RangosIngresos/GetAll")
        //      .Add("activos", 0)
        //     .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "RangosIngresos.xlsx";
        //    configuracion.NombreHojaTrabajo = "RangosIngresos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });            
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Rango Inicial", Campo = "RangoInicial" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Rango Final", Campo = "RangoFinal" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}
    }
}
