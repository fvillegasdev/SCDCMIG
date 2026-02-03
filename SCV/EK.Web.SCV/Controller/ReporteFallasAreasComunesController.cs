using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.IO;
using Newtonsoft.Json.Linq;
using EK.Common.Exportacion;

namespace EK.Web.SCV.Controller
{
    public class ReporteFallasAreasComunesController : EK.Common.BaseKontroller
    {
        [Route("ReporteFallasAreasComunes/GetTipoFallas/")]
        public async Task<ActionResult> GetTipoFallas()
        {

            return await Get("/ReporteFallasAreasComunes/GetTipoFallas")
                .Add("idUsuario", 0)
                .ExecuteAsync();
        }
        [Route("ReporteFallasAreasComunes/GetUbicacionesFallas/")]
        public async Task<ActionResult> GetUbicacionesFallas()
        {

            return await Get("/ReporteFallasAreasComunes/GetUbicacionFalla")
                .Add("idUsuario", 0)
                .ExecuteAsync();
        }
        [Route("ReporteFallasAreasComunes/GetCausaFallas/")]
        public async Task<ActionResult> GetCausaFallas()
        {

            return await Get("/ReporteFallasAreasComunes/GetCausaFalla")
                .Add("idUsuario", 0)
                .ExecuteAsync();
        }

        [Route("ReporteFallasAreasComunes/calcularPartidasOT/")]
        [HttpPost]
        public async Task<ActionResult> CalcularPartidasOT()
        {
            try
            {
                dynamic obj = base.GetInputObject();
                int idReporte = Convert.ToInt32(obj.idReporte);
                int idContratista = Convert.ToInt32(obj.idContratista);
                string orden = JsonConvert.SerializeObject(obj.orden);
                dynamic ordenes = JsonConvert.SerializeObject(obj.ordenes);

                return await Get("/ReporteFallasAreasComunes/CalcularPartidasOT")
                    .Add("idReporte", idReporte)
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

        [Route("scv/ReporteFallasAreasComunes/imprimirDiagnostico/{id}")]
        [HttpGet]
        public async Task<ActionResult> imprimirDiagnostico(int id)
        {
            try
            {
                dynamic content = await Get("/ReporteFallasAreasComunes/GetEncodedDocumentDiagnostico")
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

        [Route("scv/ReporteFallasAreasComunes/impresionDisponible/{id}")]
        [HttpGet]
        public async Task<bool> impresionDisponible(int id)
        {
            try
            {
                dynamic content = await Get("/ReporteFallasAreasComunes/GetEncodedDocumentOT")
                    .Add("id", id)
                    .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");
                if (content != null && content != "")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [Route("scv/ReporteFallasAreasComunes/imprimirOT/{id}")]
        [HttpGet]
        public async Task<ActionResult> ImprimirOT(int id)
        {
            try
            {
                dynamic content = await Get("/ReporteFallasAreasComunes/GetEncodedDocumentOT")
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
