using System;
using System.Threading.Tasks;
using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

using EK.Utils;

namespace EK.Web.SCV
{
    public class LeadsController 
        : EK.Drivers.Social.Controllers.LeadController
    {
        [Route("api/social/internal/leads/v1")]
        [HttpPost]
        public async Task<ActionResult> SaveLead()
        {
            Dictionary<string,object> leadInfo = base.Lead;

            //Dictionary<string, object> leadInfo = this.LeadFromStream;

            int idBoleta = -1;
            int errorCode = 0;
            string errorMesage = "Successful";

            try
            {
                var client = BaseKontrollerCommon.getClient(Session);

                string token = base.Token;

                leadInfo.Add("token", token);

                dynamic boleta = await client.GetServiceCommand("/boletasProspeccion/SaveLead")
                    .Add("parametros", leadInfo)
                    .ExecuteAsync();

                dynamic resultado = Newtonsoft.Json.JsonConvert.DeserializeObject(boleta.Content);
                idBoleta = (int)resultado.ID;
            }
            catch(Exception ex)
            {
                errorMesage = ex.InnerException.Message;
                errorCode = ex.HResult;
            }

            return LeadResult((int)idBoleta, errorCode, errorMesage);
        }

    }
}
