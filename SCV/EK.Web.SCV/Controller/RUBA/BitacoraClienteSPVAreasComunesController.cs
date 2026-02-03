using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.IO;
using Newtonsoft.Json.Linq;
using EK.Common.Exportacion;

namespace EK.Web.SCV.Controller.RUBA
{
    public class BitacoraClienteSPVAreasComunesController : EK.Common.BaseKontroller
    {
        [Route("scv/BitacoraClienteSPVAreasComunes/imprimirDocumento/{idCliente}/{operacionEspecificaSP}/{Opcion}")]
        [HttpGet]
        public async Task<ActionResult> ImprimirDocumento(int idCliente, string operacionEspecificaSP, string Opcion)
        {
            try
            {
                dynamic content = await Get("/BitacoraClienteSPVAreasComunes/printLogBook")
                    .Add("idCliente", idCliente)
                    .Add("operacionEspecificaSP", operacionEspecificaSP)
                    .Add("Opcion", Opcion)
                    .ExecuteAsync<string>();

                DateTime dt = DateTime.UtcNow;

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);

                //{indicar al response que muestre el documento en el browser}
                Response.AddHeader("content-disposition", string.Format("inline; filename=\"{0}_{1}.pdf\"", "BitacoraCliente", idCliente));

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
