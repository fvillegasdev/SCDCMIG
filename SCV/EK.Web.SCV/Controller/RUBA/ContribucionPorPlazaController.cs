using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.SCV.Controller
{
    public class ContribucionPorPlazaController : EK.Common.BaseKontroller
    {
        [Route("scv/contribucionPorPlaza/consulta/")]
        [HttpPost]
        public async Task<ActionResult> GetConsulta()
        {
            try
            {
                return await Get("/ContribucionPorPlaza/GetConsulta")
                    .Add("filters", base.GetInputData())
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/contribucionPorPlaza/GetConsultaFallasTopResultado/")]
        [HttpPost]
        public async Task<ActionResult> GetConsultaFallasTopResultado()
        {
            try
            {
                return await Get("/ContribucionPorPlaza/GetConsultaFallasTopResultado")
                    .Add("filters", base.GetInputData())
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/contribucionPorPlaza/exportar")]
        [HttpPost]
        public async Task<ActionResult> Exportar()
        {
            string filters = Request.Form["data"];

            dynamic data = await Get("/ContribucionPorPlaza/GetConsulta")
                .Add("filters", filters)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Excel().Exportar("ContribucionPorPlaza", data);
        }

        [Route("scv/contribucionPorPlaza/topIncidencias/exportar")]
        [HttpPost]
        public async Task<ActionResult> TopExportar()
        {
            string filters = Request.Form["data"];

            dynamic data = await Get("/ContribucionPorPlaza/GetConsultaFallasTopResultado")
                .Add("filters", filters)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Excel().Exportar("TopIncidencias", data);
        }
    }
}