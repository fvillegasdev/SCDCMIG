using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.AspNet.Identity;

using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;


//using EK.Common.Services;
using EK.Common.Utils;
using EK.Common.Reportes;
using EK.Utils;
using EK.Modelo.Kontrol;
namespace EK.Web.Kontrol.Controllers
{
    [Authorize()]
    public class ReportesController
        : EK.Common.BaseKontroller
    {
        [Route("kontrol/reportes/pbi")]
        [HttpGet]
        public async Task<ActionResult> GetPBIReportes()
        {
            return await Task.Run(() => RedirectToAction("GetReports", "Report"));
        }

        [Route("kontrol/reportes/pbi/view")]
        [HttpPost]
        public async Task<ActionResult> GetPBIReport()
        {
            var input = base.GetEncodedString(Request.Form["data"]); // base.GetInputData();
            string reportId = string.Empty;
            dynamic inputObj = JObject.Parse(input);

            // Obtener INFO del reporte
            dynamic reportInfo = await Get($"/reportes/GetById")
                .Add("id", inputObj.ID)
                .ExecuteAsync<JToken>();

            if (reportInfo.TipoReporte.Clave == "RPBI")
            {
                reportId = reportInfo.ReportePBI.Clave;
            }
            //RedirectToAction("GetReport", "Report", new { id = reportId })
            ViewData["idReport"] = reportId;
            return PartialView("PBIView");
        }

        [Route("kontrol/reportes/preview")]
        [HttpPost]
        public async Task<ActionResult> GetPreviewReport()
        {
            var input = base.GetEncodedString(Request.Form["data"]); // base.GetInputData();
            dynamic inputObj = JObject.Parse(input);

            if (inputObj.TipoReporte.Clave == "RPBI")
            {
                string clavePBI = inputObj.ReportePBI.Clave;
                return RedirectToAction("GetReport", "Report", new { id = clavePBI });
            }

            // Obtener INFO del reporte
            dynamic reportInfo = await Get($"/reportes/GetReportData")
                .Add("reporte", input)
                .ExecuteAsync<JToken>();

            // Obtener PDF
            var reporte = new EK.Common.Reportes.Reporte
            {
                Encabezado = reportInfo.PlantillaEnc,
                PieDePagina = reportInfo.PlantillaPP,
                Titulo = inputObj.Nombre,
                SubTitulo = inputObj.SubTitulo,
                FechaImpresion = System.DateTime.Now.ToString(),
                
                Columnas = new List<Reporte.Columna>()
            };
            //
            foreach (dynamic c in inputObj.Campos) {
                reporte.Columnas.Add(new Reporte.Columna() {
                    Titulo = c.Titulo,
                    Longitud = c.Width,
                    Campo = c.Clave,
                    Alineacion = c.Alineacion.Clave
                });
            }
            //
            ViewBag.Data = reportInfo.Data;
            ViewBag.Reporte = reporte;
            //
            //var identity = (ClaimsIdentity)User.Identity;
            //var uuid = identity.FindFirst("http://schemas.enkontrol.com/identity/claims/uuid");
            //var headerUrl = ToAbsoluteUrl($"~/kontrol/plantilla/{uuid.Value}/{inputObj.PlantillaEnc.Clave}");
            //var footerUrl = ToAbsoluteUrl($"~/kontrol/plantilla/{uuid.Value}/{inputObj.PlantillaPP.Clave}");
            //
            // string customSwitches = string.Format("--header-html {0} --header-spacing 10 --footer-html {1} --header-spacing 10", headerUrl, footerUrl);
            // string customSwitches = string.Format("--header-html {0} --footer-html {1}", headerUrl, footerUrl);
            //
            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/Reporteador.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 } //,
                //CustomSwitches = customSwitches
            };
        }
    }
}
