using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EK.Web.SCV.Controller
{
    public class ConsultaViviendaEntregableController : EK.Common.BaseKontroller
    {
        [Route("ConsultaViviendaEntregable/GetPlazas/")]

        public async Task<ActionResult> GetPlazas()
        {

            return await Get("/ConsultaViviendaEntregable/GetPlazas")
                .Add("Usuario", 0)
                .ExecuteAsync();
        }

        [Route("ConsultaViviendaEntregable/GetHipotecaVerde/")]
        public async Task<ActionResult> GetHipotecaVerde()
        {
            return await Get("/ConsultaViviendaEntregable/GetHipotecaVerde")
                .ExecuteAsync();
        }

        [Route("ConsultaViviendaEntregable/GetEquipamiento/")]
        public async Task<ActionResult> GetEquipamiento()
        {
            return await Get("/ConsultaViviendaEntregable/GetEquipamiento")
                .ExecuteAsync();
        }

        [Route("ConsultaViviendaEntregable/GetFinanciamiento/")]
        public async Task<ActionResult> GetFinanciamiento()
        {
            return await Get("/ConsultaViviendaEntregable/GetFinanciamiento")
                .ExecuteAsync();
        }

        [Route("ConsultaViviendaEntregable/GetViviendasEntregadas/")]
        public async Task<ActionResult> GetViviendasEntregadas()
        {
            return await Get("/ConsultaViviendaEntregable/GetViviendasEntregadas")
                .ExecuteAsync();
        }

        [Route("ConsultaViviendaEntregable/GetTipoVivienda/")]
        public async Task<ActionResult> GetTipoVivivienda()
        {
            return await Get("/ConsultaViviendaEntregable/GetTipoVivienda")
                .ExecuteAsync();
        }

        [Route("ConsultaViviendaEntregable/GetMotivoRezago/")]
        public async Task<ActionResult> GetMotivoRezago()
        {
            return await Get("/ConsultaViviendaEntregable/GetMotivoRezago")
                .ExecuteAsync();
        }

        //[Route("ConsultaViviendaEntregable/GetViviendasEntregables/")]
        //[HttpPost]
        //public async Task<ActionResult> GetViviendasEntregables()
        //{
         
        //    var obj = base.GetDictionary();

        //    return await Get("/ConsultaViviendaEntregable/GetViviendasEntregables")
        //        .Add("parametros", obj)
        //        .ExecuteAsync();
        //}
        
        //Export to Excel
        [Route("ConsultaViviendasEntregables/Excel/")]
        [HttpPost]
        public async Task<ActionResult> GetPreviewReport()
        {

            var input = Request.Form["data"]; // base.GetInputData();
            dynamic obj = base.GetEncodedDictionary(input);
            //dynamic obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(input);

            dynamic data = await Get($"/ConsultaViviendaEntregable/GetViviendasEntregables")
              .Add("parametros", obj)
              .ExecuteAsync<JToken>();

            ViewBag.Data = data;
            return new Excel().Exportar("ConsultaViviendaEntregable", data);

        }

        [Route("ConsultaViviendaEntregable/GetAgendaViviendasEntregables/")]
        [HttpPost]
        public async Task<ActionResult> GetAgendaViviendasEntregables()
        {
            var input = base.GetInputObject();
            var PlazaInicial = Convert.ToString(input.PlazaInicial.ID);
            var FraccInicial = Convert.ToString(input.FraccInicial.ID);
            var PersonaEntregaV = Convert.ToString(input.PersonaEntregaV.id);

            //
            return await Get("/ConsultaViviendaEntregable/GetAgendaViviendasEntregables")
                .Add("PlazaInicial", PlazaInicial)
                .Add("FraccInicial", FraccInicial)
                .Add("PersonaEntregaV", PersonaEntregaV)
                .ExecuteAsync();
        }


    }
}