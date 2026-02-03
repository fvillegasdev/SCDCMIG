using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EK.Web.SCV.Controller
{
    public class ConsultaPreparacionViviendaController : EK.Common.BaseKontroller
    {
        //[Route("ConsultaPreparacionVivienda/GetPreparacionVivienda/")]
        //[HttpPost]
        //public async Task<ActionResult> GetPreparacionVivienda()
        //{
           
        //    var obj = base.GetDictionary();

        //    return await Get("/ConsultaPreparacionVivienda/GetPreparacionVivienda")
        //        .Add("parametros", obj)
        //        .ExecuteAsync();

        //}

        //Export to Excel
        [Route("ConsultaPreparacionVivienda/Excel/")]
        [HttpPost]
        public async Task<ActionResult> GetPreviewReport()
        {
            var input = Request.Form["data"]; // base.GetInputData();
            dynamic obj = base.GetEncodedDictionary(input);

            dynamic data = await Get($"/ConsultaPreparacionVivienda/GetPreparacionVivienda")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;
            
            return new Excel().Exportar("ConsultaPreparacionVivienda", data);

        }

    }
}