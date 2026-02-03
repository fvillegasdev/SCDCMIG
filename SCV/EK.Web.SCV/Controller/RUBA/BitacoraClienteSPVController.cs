using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.IO;
using Newtonsoft.Json.Linq;
using EK.Common.Exportacion;
using System.Collections.Generic;

namespace EK.Web.SCV.Controller
{
    public class BitacoraClienteSPVController : EK.Common.BaseKontroller
    {
       
        [Route("scv/bitacoraCLienteSPV/imprimirDocumento/{idCliente}/{operacionEspecificaSP}")]
        [HttpGet]
        public async Task<ActionResult> ImprimirDocumento(int idCliente, string operacionEspecificaSP)
        {
            try
            {
                dynamic content = await Get("/BitacoraClienteSPV/printLogBook")
                    .Add("idCliente", idCliente)
                    .Add("operacionEspecificaSP", operacionEspecificaSP)
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

        [Route("scv/bitacoraCLienteSPV/imprimirDocumentoHistorial/{idCliente}")]
        [HttpGet]
        public async Task<ActionResult> ImprimirDocumentoHistorial(int idCliente)
        {
            try
            {
                dynamic content = await Get("/BitacoraClienteSPV/printHistorialIncidencias")
                    .Add("idCliente", idCliente)
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

        [Route("scv/bitacoraCLienteSPV/GetB64EvidenciasBitacora/{idComentario}")]
        [HttpGet]
        public async Task<ActionResult> GetListaCatsEnviarCorreo(int idComentario)
        {
            try
            {
                var content = await Get("/BitacoraClienteSPV/GetB64EvidenciasBitacora")
                     .Add("idComentario", idComentario)
                     .ExecuteAsync();

                return content;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("scv/bitacoraCLienteSPV/MarcarComentario/{idComentario}")]
        [HttpGet]
        public async Task<string> MarcarComentarioValidado(int idComentario)
        {
            try
            {
               var content = await Get("/BitacoraClienteSPV/MarcarComentarioValidado")
                    .Add("idComentario", idComentario)
                    .ExecuteAsync<string>();
                return content;
           
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}