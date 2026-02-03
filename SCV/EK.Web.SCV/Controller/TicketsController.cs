using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace EK.Web.SCV.Controller
{
    public class TicketsController : EK.Common.BaseKontroller
    {
        [Route("scv/tickets/calcularPartida/")]
        [HttpPost]
        public async Task<ActionResult> CalcularPartida()
        {
            dynamic data = base.GetInputObject();
            string partida = JsonConvert.SerializeObject(data.partida);
            string reporte = JsonConvert.SerializeObject(data.reporte);

            try
            {
                return await Get("/tickets/CalcularPartida")
                    .Add("partida", partida)
                    .Add("reporte", reporte)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [Route("scv/tickets/calcularPartidasOT/")]
        [HttpPost]
        public async Task<ActionResult> CalcularPartidasOT()
        {
            try
            {
                dynamic obj = base.GetInputObject();
                int idTicket = Convert.ToInt32(obj.idTicket);
                int idContratista = Convert.ToInt32(obj.idContratista);
                string orden = JsonConvert.SerializeObject(obj.orden);
                dynamic ordenes = JsonConvert.SerializeObject(obj.ordenes);

                return await Get("/tickets/CalcularPartidasOT")
                    .Add("idTicket", idTicket)
                    .Add("idContratista", idContratista)
                    .Add("orden", orden)
                    .Add("ordenes", ordenes)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [Route("scv/tickets/imprimirOT/{id}")]
        [HttpGet]
        public async Task<ActionResult> ImprimirOT(int id)
        {
            try
            {
                dynamic content = await Get("/tickets/GetEncodedDocumentOT")
                    .Add("id", id)
                    .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);

                //{indicar al response que muestre el documento en el browser}
                Response.AddHeader("content-disposition", string.Format("inline; filename=\"orden_trabajo_{0}.pdf\"", uid));

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}