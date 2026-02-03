using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EK.Web.SCV.Controller
{
    public class ConfigViviendaEntregableController : EK.Common.BaseKontroller
    {

        //[Route("ConfigViviendaEntregable/GetConfigViviendaEntregable/")]
        //[HttpPost]
        //public async Task<ActionResult> GetConfigViviendaEntregable()
        //{
 
        //    var obj = base.GetDictionary();

        //    return await Get("/ConfigViviendaEntregable/GetConfigViviendaEntregable")
        //        .Add("parametros", obj)
        //        .ExecuteAsync();

        //}

        //Export to Excel
        [Route("ConfigViviendaEntregable/Excel/")]
        [HttpPost]
        public async Task<ActionResult> GetPreviewReport()
        {
            var input = Request.Form["data"]; // base.GetInputData();
            dynamic obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(input);

            dynamic data = await Get($"/ConfigViviendaEntregable/GetConfigViviendaEntregable")
              .Add("parametros", obj)
              .ExecuteAsync<JToken>();

            ViewBag.Data = data;
            return new Excel().Exportar("ConfigViviendaEntregable", data);

        }

        [Route("ConsultaViviendaEntregable/GetDetallesReprog/")]
        [HttpPost]
        public async Task<ActionResult> GetDetallesReprog()
        {
            var obj = base.GetDictionary();
            return await Get("/ConsultaViviendaEntregable/GetDetallesReprog")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("ConfigViviendaEntregable/SaveDetProg/")]
        [HttpPost]
        public async Task<ActionResult> SaveDetProg()
        {
            var input = base.GetInputObject();
            var numcte = Convert.ToString(input.numcte);
            var desc_detalle_repr = Convert.ToString(input.desc_detalle_repr);
            var cve_detalle = Convert.ToString(input.cve_detalle);
            var bit_reparado = Convert.ToString(input.bit_reparado);

            return await Get("/ConfigViviendaEntregable/SaveDetProg")
                .Add("numcte", numcte)
                .Add("desc_detalle_repr", desc_detalle_repr)
                .Add("cve_detalle", cve_detalle)
                .Add("bit_reparado", bit_reparado)
                .ExecuteAsync();
        }

        [Route("ConfigViviendaEntregable/SaveConfigViv/")]
        [HttpPost]
        public async Task<ActionResult> SaveConfigViv()
        {
            var input = base.GetInputObject();
            var numcte = Convert.ToString(input.numcte);
            var FechaProgramacion = Convert.ToString(input.FechaProgramacion);
            var PersonaEntregaV = Convert.ToString(input.PersonaEntregaV);
            var HoralugarEntrega = Convert.ToString(input.HoralugarEntrega);
            var ObservacionesCte = Convert.ToString(input.ObservacionesCte);


            return await Get("/ConfigViviendaEntregable/SaveConfigViv")
                .Add("numcte", numcte)
                .Add("fecha_programacion", FechaProgramacion)
                .Add("num_entrega_viv", PersonaEntregaV)
                .Add("lugar_hora_entrega", HoralugarEntrega)
                .Add("bit_detalles", ObservacionesCte)
                .ExecuteAsync();
        }

        [Route("ConfigViviendaEntregable/GetDocsImpresion/")]
        [HttpPut]
        public async Task<ActionResult> GetDocsImpresion()
        {
            //dynamic input = base.GetDictionary();
            dynamic input = base.GetInputData();
            try
            {
                return await Get("/ConfigViviendaEntregable/GetDocumentoImpresion")
                    .Add("model", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [Route("ConfigViviendaEntregable/UpdateResponsableEntViv")]
        [HttpPost]
        public async Task<ActionResult> UpdateResponsableEntViv()
        {
            var input = base.GetDictionary();
            //var IdResponsable = Convert.ToString(input.IdResponsable);
            //var IdAgenda = Convert.ToString(input.IdAgenda);
            //var Folio = Convert.ToString(input.Folio);

            try
            {
                return await Get("/ConfigViviendaEntregable/UpdateResponsableEntViv")
                    .Add("parametros", input)
                    //.Add("Folio", Folio)
                    //.Add("IdAgenda", IdAgenda)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}