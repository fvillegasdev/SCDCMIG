using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EK.Web.SCV.Controller
{
    public class AgendaEntregaViviendaController : EK.Common.BaseKontroller
    {


        [Route("ConsultaViviendaEntregable/GetPersonaEntregaV/{filtros?}")]
        [HttpGet]
        public async Task<ActionResult> GetPersonaEntregaV(string filtros)
        {

            var obj = filtros != null ? base.GetEncodedDictionary(filtros) : new Dictionary<string, object>();

            return await Get("/ConsultaViviendaEntregable/GetPersonaEntregaV")
                .Add("parametros", obj)
                .ExecuteAsync();

        }

        [Route("ConsultaViviendaEntregable/UpdEstatusAgendaEntVivienda/")]
        [HttpPost]
        public async Task<ActionResult> UpdEstatusAgendaEntVivienda()
        {
            var input = base.GetInputObject();
            var numcte = Convert.ToString(input.numcte);
            var desc_detalle_repr = Convert.ToString(input.desc_detalle_repr);
            var cve_detalle = Convert.ToString(input.cve_detalle);
            var bit_reparado = Convert.ToString(input.bit_reparado);

            return await Get("/ConsultaViviendaEntregable/UpdEstatusAgendaEntVivienda")
                .Add("numcte", numcte)
                .Add("desc_detalle_repr", desc_detalle_repr)
                .Add("cve_detalle", cve_detalle)
                .Add("bit_reparado", bit_reparado)
                .ExecuteAsync();
        }

        //[Route("Agenda/SaveDetProg/")]
        //[HttpPost]
        //public async Task<ActionResult> SaveDetProg()
        //{
        //    var obj = base.GetDictionary();
        //     return await Get("/AgendaSPV/SaveDetProg")
        //         .Add("parametros", obj)
        //        .ExecuteAsync();
        //}

    }
}