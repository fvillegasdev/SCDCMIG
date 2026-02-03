using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace EK.Web.SBO.Controllers
{
    public class ChequesController
        : EK.Common.BaseKontroller
    {
        public ChequesController() 
            : base()
        {
        }

        #region Reportes

        [Route("cheques/reporte/detallado")]
        [Route("Cheques/GetAll")]
        [HttpGet]
        public ActionResult GetAll()
        {
            return Get("/Cheques/GetReporteCheques").Execute();
        }

        public ActionResult ImprimeDetalladoCheques()
        {
            ViewBag.Data = Get("/Cheques/GetReporteCheques").Execute<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SBO/Reportes/ChequesDetallado.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        public ActionResult ImprimeDetalladoChequesHtml()
        {
            ViewBag.Data = Get("/Cheques/GetReporteCheques").Execute<JToken>();

            return View("~/Views/SBO/Reportes/ChequesDetallado.cshtml");
        }

        [Route("Cheques/CreateBatch/")]
        [HttpPut]
        public ActionResult CreateBatch()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            string FormJson = input.ToString();

            return Get("/Cheques/CreateBatch").Add("FormJson", FormJson).Execute();
        }

        [Route("Cheques/GetCheques/")]
        [HttpPut]
        public ActionResult GetCheques()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            string FormJson = input.ToString();

            return Get("/Cheques/GetCheques").Add("FormJson", FormJson).Execute();
        }

        [Route("Cheques/GetById/{id}")]
        [HttpGet]
        public ActionResult GetById(int id)
        {
            return Get("/Cheques/GetById").Add("id", id).Execute();
        }
        
        [Route("Cheques/GetConsecutivoCheque/{idCuentaBancaria}/{tipoCheque}")]
        [HttpGet]
        public ActionResult GetConsecutivoCheque(int idCuentaBancaria, string tipoCheque)
        {
            return Get("/Cheques/GetConsecutivoCheque")
                .Add("idCuentaBancaria", idCuentaBancaria)
                .Add("tipoCheque", tipoCheque)
                .Execute();
        }

        [Route("Cheques/GetChequesBatch/")]
        [HttpPut]
        public ActionResult GetChequesBatch()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            string FormJson = input.ToString();

            return Get("/Cheques/GetChequesBatch").Add("FormJson", FormJson).Execute();
        }

        [Route("Cheques/update")]
        [Route("Cheques/Save")]
        [HttpPut]
        public ActionResult Save()
        {

            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            string FormJson = input.ToString();
          
            return Get("/Cheques/Save")
                .Add("cheque", FormJson)
                .Execute();

        }
                
        [Route("Cheques/CancelarCheque")]
        [HttpPut]
        public ActionResult CancelarCheque(int idCheque)
        {
         
            return Get("/Cheques/CancelarCheque")
                .Add("idCheque", idCheque)
                .Execute();

        }

        [Route("Cheques/GenerarBatch")]
        [HttpPut]
        public ActionResult GenerarBatch()
        {
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            string FormJson = input.ToString();
            return Get("/Cheques/GenerarBatch")
                .Add("cheques", FormJson)
                .Execute();

        }

        [Route("Cheques/GenerarChequesAutomaticos")]
        [HttpPut]
        public ActionResult GenerarChequesAutomaticos()
        {
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            string FormJson = input.ToString();
            return Get("/Cheques/GenerarChequesAutomaticos")
                .Add("pagos", FormJson)
                .Execute();
        }

        [Route("Cheques/CantidadLetra/{monto}/{tipoMoneda}")]
        [HttpGet]
        public ActionResult CantidadLetra(decimal monto, string tipoMoneda)
        {
            return Get("/Cheques/CantidadLetra")
                .Add("monto", monto)
                .Add("tipoMoneda", tipoMoneda)
                .Execute();
        }
        #endregion

        #region Filtros Cheques

        [Route("Cheques/GetChequesMaxMin/{idCuentaBancaria}")]
        [HttpGet]
        public ActionResult GetChequesMaxMin(int idCuentaBancaria)
        {
            return Get("/Cheques/GetChequesMaxMin").Add("idCuentaBancaria", idCuentaBancaria).Execute();
        }


        #endregion

    }
}
