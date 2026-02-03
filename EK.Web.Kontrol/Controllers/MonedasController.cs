using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace EK.Web.Kontrol.Controllers
{
    public class MonedasController 
        : EK.Common.BaseKontroller
    {
        public MonedasController()
            : base("kontrol", "Monedas")
        {}

        //[Route("base/kontrol/monedas/imprimir")]
        //public async Task<ActionResult> Imprimir()
        //{
        //    dynamic obj = await Get("/monedas/GetAll").Add("idPage", "monedas").Add("activos", 0).ExecuteAsync<JToken>();

        //    ViewBag.Data = obj;

        //    return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/Monedas.cshtml")
        //    {
        //        PageSize = Rotativa.Options.Size.Letter,
        //        PageOrientation = Rotativa.Options.Orientation.Portrait,
        //        PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
        //    };
        //}

        //[Route("kontrol/monedas/exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/monedas/GetAll").Add("idPage", "monedas").Add("activos", 0).ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Monedas.xlsx";
        //    configuracion.NombreHojaTrabajo = "Monedas";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });

        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
