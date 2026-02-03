using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.SCV.Controller
{
    public class ExpedientesDashBoardController : EK.Common.BaseKontroller
    {
        
        [Route("SCV/Expedientes/DashBoard/Estados/{parametros}")]
        [HttpGet]
        public async Task<ActionResult> GetEstados(string parametros)
        {
            var obj = base.GetEncodedDictionary(parametros);

            return await Get($"/dashBoardExpedientes/GetEstados")
                .Add("parametros", obj)
                .ExecuteAsync();
        }


        [Route("SCV/Expedientes/DashBoard/Fases/{parametros}")]
        [HttpGet]
        public async Task<ActionResult> GetFases(string parametros)
        {
            var obj = base.GetEncodedDictionary(parametros);

            return await Get($"/dashBoardExpedientes/GetFases")
                .Add("parametros", obj)
                .ExecuteAsync();
        }


        [Route("SCV/Expedientes/DashBoard/Etapas/{parametros}")]
        [HttpGet]
        public async Task<ActionResult> GetEtapas(string parametros)
        {
            var obj = base.GetEncodedDictionary(parametros);

            return await Get($"/dashBoardExpedientes/GetEtapasDashBoard")
                .Add("parametros", obj)
                .ExecuteAsync();
        }


        [Route("SCV/Expedientes/DashBoard/TopGraficaEtapas/{parametros}")]
        [HttpGet]
        public async Task<ActionResult> GetTopGraficaEtapas(string parametros)
        {
            var obj = base.GetEncodedDictionary(parametros);

            return await Get($"/dashBoardExpedientes/GetTopGraficaEtapas")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("SCV/Expedientes/DashBoard/TopGraficaDesarrollos/{parametros}")]
        [HttpGet]
        public async Task<ActionResult> GetTopGraficaDesarrollos(string parametros)
        {
            var obj = base.GetEncodedDictionary(parametros);

            return await Get($"/dashBoardExpedientes/GetTopGraficaDesarrollos")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

    }
}