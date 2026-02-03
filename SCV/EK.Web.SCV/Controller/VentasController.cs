using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace EK.Web.SCV.Controller
{
    public class VentasController : EK.Common.BaseKontroller
    {
        [Route("Ventas({id},{activos})")]
        [Route("Ventas/GetAll({id},{activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int id, int activos)
        {
            return await Get("/Ventas/GetAll")
                .Add("id", id)
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("Ventas/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Ventas/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        #region AUTHORIZE_VENTA

        [Route("Ventas/AllowAuthorize/{idExpediente}")]
        [HttpGet]
        public async Task<ActionResult> AllowAuthorize(int idExpediente)
        {
            return await Get("/Ventas/IsAllowedToAuthorize")
                .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        [Route("Ventas/RequestAuthorize/")]
        [HttpPost]
        public async Task<ActionResult> RequestAuthorize()
        {
            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string model = JsonConvert.SerializeObject(data.model);
            string idExpediente = JsonConvert.SerializeObject(data.IdExpediente);
            string idVenta = JsonConvert.SerializeObject(data.ID);

            return await Get("/Ventas/RequestAuthorize")
                .Add("idVenta", idVenta)
                 .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        [Route("ventas/AllowReestructura/{idExpediente}")]
        [HttpGet]
        public async Task<ActionResult> AllowReestructura(int idExpediente)
        {
            return await Get("/Ventas/IsAllowedToReestructura")
                .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        [Route("Ventas/StartReestructura/")]
        [HttpPost]
        public async Task<ActionResult> StartReestructura()
        {

            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string idExpediente = JsonConvert.SerializeObject(data.IdExpediente);
            string idVenta = JsonConvert.SerializeObject(data.ID);

            return await Get("/Ventas/StartReestructura")
                .Add("idVenta", idVenta)
                 .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        #endregion

        [Route("Ventas/ReestructurarVenta/{idVenta}")]
        [HttpPut]
        public async Task<ActionResult> ReestructurarVenta(int idVenta)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return await Get("/Ventas/ReestructurarVenta")
                .Add("idVenta", idVenta)
                .Add("item", input)
                .ExecuteAsync();
        }

        [Route("ventas/save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return await Get("/ventas/save")
                .Add("venta", input)
                .ExecuteAsync();
        }
        [Route("Ventas/SaveEsquema/{idVenta}")]
        [HttpPut]
        public async Task<ActionResult> SaveEsquema(int idVenta)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return await Get("/Ventas/SaveEsquema")
                .Add("idVenta", idVenta)
                .Add("ventaEsquema", input)
                .ExecuteAsync();
        }

        [Route("Ventas/SavePP")]
        [HttpPost]
        public async Task<ActionResult> SavePP()
        {
            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string model = JsonConvert.SerializeObject(data.model);
            string idExpediente = JsonConvert.SerializeObject(data.idExpediente);
            string save = JsonConvert.SerializeObject(data.save);

            try
            {
                return await Get("/Ventas/SavePP")
                    .Add("ventaPlanPago", model)
                    .Add("IdExpediente", idExpediente)
                     .Add("save", save)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        [Route("Ventas/GetUbicacionesById({idVenta})")]
        [Route("Ventas/GetUbicacionesById/{idVenta}")]
        [HttpGet]
        public async Task<ActionResult> GetConceptosPagosById(int idVenta)
        {
            return await Get("/Ventas/GetUbicacionesById")
              .Add("idVenta", idVenta)
              .ExecuteAsync();
        }

        [Route("Ventas/PlanesDePagoPorDesarrollo({id})")]
        [HttpGet]
        public async Task<ActionResult> GetPlanesDePagoPorDesarrollo(int id)
        {
            return await Get("/PlanesPagos/GetByDesarrollo")
              .Add("idDesarrollo", id)
              .ExecuteAsync();
        }

        [Route("Ventas/GetPlanDePagos")]
        [HttpPost]
        public async Task<ActionResult> GetPlanDePagos()
        {
            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string idVenta = JsonConvert.SerializeObject(data.idVenta);
            string idPlanPagos = JsonConvert.SerializeObject(data.idPlanPagos);
            string idExpediente = JsonConvert.SerializeObject(data.idExpediente);
            string financiamiento = JsonConvert.SerializeObject(data.financiamiento);
            string ubicaciones = JsonConvert.SerializeObject(data.ubicaciones);

            return await Get("/Ventas/CalcularPlanPagos")
              .Add("idVenta", idVenta)
              .Add("idPlanPagos", idPlanPagos)
              .Add("idExpediente", idExpediente)
              .Add("financiamiento", financiamiento)
              .Add("ubicaciones", ubicaciones)
              .ExecuteAsync();
        }

        [Route("ventas/RecalcularUbicaciones")]
        [HttpPost]
        public async Task<ActionResult> RecalcularUbicaciones()
        {
            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string ubicaciones = JsonConvert.SerializeObject(data.ubicaciones);
            string idFinanciamiento = JsonConvert.SerializeObject(data.idFinanciamiento);
            string idVenta = JsonConvert.SerializeObject(data.idVenta);
            string idExpediente = JsonConvert.SerializeObject(data.idExpediente);

            return await Get("/Ventas/RecalcularUbicaciones")
              .Add("idVenta", idVenta)
              .Add("ubicaciones", ubicaciones)
              .Add("idFinanciamiento", idFinanciamiento)
              .Add("idExpediente", idExpediente)
              .ExecuteAsync();
        }


        [Route("ventas/RecalcularPlanDePagos")]
        [HttpPost]
        public async Task<ActionResult> RecalcularPlanPagos()
        {
            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string venta = JsonConvert.SerializeObject(data.venta);

            string concepto = null;
            object c = data.concepto;
            if (c != null && c.ToString() != "")
            {
                concepto = JsonConvert.SerializeObject(data.concepto);
            }

            return await Get("/Ventas/RecalcularPlanPagos")
              .Add("venta", venta)
              .Add("concepto", concepto)
              .ExecuteAsync();
        }

        [Route("ventas/AgregarAbonoCapital")]
        [HttpPost]
        public async Task<ActionResult> AgregarAbonoCapital()
        {
            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string venta = JsonConvert.SerializeObject(data.venta);
            string concepto = JsonConvert.SerializeObject(data.concepto);
            string abono = JsonConvert.SerializeObject(data.abono);

            return await Get("/Ventas/AgregarAbonoCapital")
              .Add("venta", venta)
              .Add("concepto", concepto)
              .Add("abono", abono)
              .ExecuteAsync();
        }

        [Route("Ventas/GetVentaUbicacion")]
        [HttpPost]
        public async Task<ActionResult> VentaUbicacion()
        {
            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string Ubicacion = JsonConvert.SerializeObject(data);
            //     string caracteristicas = JsonConvert.SerializeObject(data.caracteristicas);

            return await Get("/Ventas/VentaUbicacion")
              .Add("ventaUbicacion", Ubicacion)
              //  .Add("caracteristicas", caracteristicas)
              .ExecuteAsync();
        }

        [Route("Ventas/GetVentaEsquema({idVenta})")]
        [Route("Ventas/GetVentaEsquema/{idVenta}")]
        [HttpGet]
        public async Task<ActionResult> VentaEsquema(int idVenta)
        {
            return await Get("/Ventas/GetVentaEsquema")
              .Add("idVenta", idVenta)
              .ExecuteAsync();
        }

        [Route("Ventas/GetConfiguracionEsquema/{idExpediente}")]
        [HttpGet]
        public async Task<ActionResult> GetConfiguracionEsquema(int idExpediente)
        {
            return await Get("/Ventas/GetConfiguracionEsquema")
                .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        [Route("Ventas/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            ViewBag.Data = await Get("/Ventas/GetAll")
                .Add("id", 0)
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Ventas.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        [Route("ventas/porexpediente")]
        [HttpPost]
        public async Task<ActionResult> GetInfoVenta()
        {
            var input = base.GetInputObject();

            return await Get("/Ventas/GetVentaByExpedienteId").Add("IdExpediente", input.IdExpediente).ExecuteAsync();
        }

        [Route("ventas/getexpediente")]
        [HttpPost]
        public async Task<ActionResult> GetInformacion()
        {
            var input = base.GetInputObject();

            return await Get("/Ventas/GetEntidadByExpedienteId").Add("IdExpediente", input.IdExpediente).ExecuteAsync();
        }

        //{controlador de pruebas para autorizacion}
        [Route("Ventas/test/authorize/{id}/{clave}")]
        [HttpGet]
        public async Task<ActionResult> TestAuthorize(int id, string clave)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                var workflow = new JObject();
                workflow.Add("ID", 0);
                workflow.Add("Clave", clave);

                var instance = new JObject();
                instance.Add("ID", 0);
                instance.Add("Workflow", workflow);

                string obj = JsonConvert.SerializeObject(instance);

                return await Get("/Ventas/Authorize")
                    .Add("id", id)
                    .Add("instance", obj)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //{controlador de pruebas para rechazar ventas}
        [Route("Ventas/test/reject/{id}")]
        [HttpGet]
        public async Task<ActionResult> TestReject(int id)
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get("/Ventas/Reject")
                    .Add("id", id).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Estado de Cuenta
        [Route("Ventas/GetEdocuenta/")]
        [HttpPost]
        public async Task<ActionResult> GetEdocuenta()
        {

            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string model = JsonConvert.SerializeObject(data.model);
            string idVenta = JsonConvert.SerializeObject(data.idVenta);
            string idConceptopago = JsonConvert.SerializeObject(data.idConceptopago);
            string estatus = JsonConvert.SerializeObject(data.estatus);
            string concepto = JsonConvert.SerializeObject(data.concepto);
            string idExpediente = JsonConvert.SerializeObject(data.idExpediente);

            return await Get("/Ventas/GetEdocuenta")
                 .Add("idVenta", idVenta)
                 .Add("idConceptopago", idConceptopago)
                 .Add("estatus", estatus)
                 .Add("concepto", concepto)
                 .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }
        //Documentos Cancelados
        [Route("Ventas/GetDocsCancelados/")]
        [HttpPost]
        public async Task<ActionResult> GetDocsCancelados()
        {

            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string model = JsonConvert.SerializeObject(data.model);
            string idVenta = JsonConvert.SerializeObject(data.idVenta);
            string idConceptopago = JsonConvert.SerializeObject(data.idConceptopago);
            string ventaVersion = JsonConvert.SerializeObject(data.ventaVersion);
            string idExpediente = JsonConvert.SerializeObject(data.idExpediente);

            return await Get("/Ventas/GetDocumentosCancelados")
                 .Add("idVenta", idVenta)
                 .Add("idConceptopago", idConceptopago)
                 .Add("ventaVersion", ventaVersion)
                 .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        //establecer cotizacion
        [Route("ventas/SetCotizacion/")]
        [HttpPost]
        public async Task<ActionResult> SetCotizacion()
        {
            var obj = base.GetInputObject();
            dynamic item = JsonConvert.SerializeObject(obj.item);
            dynamic cotizaciones = JsonConvert.SerializeObject(obj.cotizaciones);
            int idExpediente = Convert.ToInt32(obj.idExpediente);

            return await Get("/Ventas/SetCotizacion")
                .Add("item", item)
                .Add("cotizaciones", cotizaciones)
                .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        [Route("ventas/AllowSelectCotizacion/{idExpediente}")]
        [HttpGet]
        public async Task<ActionResult> AllowSelectCotizacion(int idExpediente)
        {
            return await Get("/Ventas/IsAllowedToSelectCotizacion")
                .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        //seleccionar cotizacion
        [Route("ventas/SelectCotizacion/")]
        [HttpPost]
        public async Task<ActionResult> SelectCotizacion()
        {
            var obj = base.GetInputObject();
            int idCotizacion = Convert.ToInt32(obj.idCotizacion);
            int idExpediente = Convert.ToInt32(obj.idExpediente);

            return await Get("/Ventas/SeleccionarCotizacion")
                .Add("idCotizacion", idCotizacion)
                .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        [Route("ventas/RecalcularCotizaciones")]
        [HttpPost]
        public async Task<ActionResult> RecalcularCotizaciones()
        {
            var item = base.GetInputData();

            return await Get("/Ventas/RecalcularCotizaciones")
                .Add("item", item)
                .ExecuteAsync();
        }

        [Route("ventas/AllowFiniquito/{idExpediente}")]
        [HttpGet]
        public async Task<ActionResult> AllowFiniquito(int idExpediente)
        {
            return await Get("/Ventas/IsAllowedToFiniquito")
                .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        [Route("ventas/StartFiniquito/")]
        [HttpPost]
        public async Task<ActionResult> StartFiniquito()
        {

            var source = base.GetInputData();
            dynamic data = JObject.Parse(source);
            string idExpediente = JsonConvert.SerializeObject(data.IdExpediente);
            string idVenta = JsonConvert.SerializeObject(data.ID);

            return await Get("/Ventas/StartFiniquito")
                .Add("idVenta", idVenta)
                 .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        //[Route("ventas/GetCotizacionById/{idCotizacion}/{idExpediente}")]
        //[HttpGet]
        //public async Task<ActionResult> GetCotizacionById(int idCotizacion, int idExpediente)
        //{
        //    return await Get("/Ventas/GetCotizacionById")
        //        .Add("idCotizacion", idCotizacion)
        //        .Add("idExpediente", idExpediente)
        //        .ExecuteAsync();
        //}

        [Route("ventas/GetCotizacionSeleccionada/{idExpediente}")]
        [HttpGet]
        public async Task<ActionResult> GetCotizacionSeleccionada(int idExpediente)
        {
            return await Get("/Ventas/GetCotizacionSeleccionada")
                .Add("idExpediente", idExpediente)
                .ExecuteAsync();
        }

        [Route("ventas/imprimir/cotizacion/{idCotizacion}/{idExpediente}")]
        [Route("ventas/imprimir/cotizacion/{idCotizacion}/expediente/{idExpediente}")]
        [HttpGet]
        public async Task<ActionResult> ImprimirCotizacion(int idCotizacion, int idExpediente)
        {
            try
            {
                dynamic content = await Get("/Ventas/ImprimirCotizacion")
                    .Add("idCotizacion", idCotizacion)
                    .Add("idExpediente", idExpediente)
                    .ExecuteAsync<string>();

                //{eliminar los caracteres de escape dentro del string}
                content = content.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                //{crear memoryStream desde un base64}
                byte[] byteArray = Convert.FromBase64String(content);
                MemoryStream retValue = new MemoryStream(byteArray);

                //{indicar al response que muestre el documento en el browser}
                Response.AddHeader("content-disposition", "inline; filename=\"propuesta.pdf\"");

                return File(retValue, "application/pdf");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }  
    }
}