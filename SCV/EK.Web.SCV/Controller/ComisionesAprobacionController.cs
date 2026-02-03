using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using web = System.Web.Http;

namespace EK.Web.SCV.Controller
{
    public class ComisionesAprobacionController:EK.Common.BaseKontroller
    {
        [Route("comisionesAprobacion({activos})")]
        [Route("comisionesAprobacion/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        {
            return await Get("/ComisionesAprobacion/GetAll")
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("comisionesAprobacion/RequestAuthorize")]
        [HttpPost]
        public async Task<ActionResult> RequestAuthorize()
        {
            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string model = JsonConvert.SerializeObject(data.model);
            string idVersionAC = JsonConvert.SerializeObject(data.ID);
            return await Get("/ComisionesAprobacion/RequestAuthorize")
                .Add("idVerisonAC", idVersionAC)
                .ExecuteAsync();
        }

        [Route("comisionesAprobacion/SaveComisionesAprobacion")]
        [HttpPut]
        public async Task<ActionResult> SaveComisionesAprobacion() {
            var input = base.GetInputData();
            try
            {
                return await Get("/ComisionesAprobacion/SaveVersion")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [Route("ComisionesAprobacion/id")]
        [HttpPost]
        public async Task<ActionResult> GetById()
        {
            dynamic obj = base.GetInputObject();

            return await Get($"/ComisionesAprobacion/GetVersionesById")
                .Add("id", obj.id)
                .ExecuteAsync();
        }

    }
}
