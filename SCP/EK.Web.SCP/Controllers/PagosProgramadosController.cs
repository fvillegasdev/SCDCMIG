using System;
using System.Web.Mvc;

namespace EK.Web.SCP
{
    public class PagosProgramadosController : EK.Common.BaseKontroller
    {
        public PagosProgramadosController() : base()
        {
        }

        [HttpPost]
        public ActionResult Get(int idcompania, int proveedorini, int proveedorfin, string ccInicial, string ccFinal, DateTime fechaCorte)
        {
            return Get("/PagosProgramados/Get")
                .Add("idcompania", idcompania)
                .Add("proveedorini", proveedorini)
                .Add("proveedorfin", proveedorfin)
                .Add("ccInicial", ccInicial)
                .Add("ccFinal", ccFinal)
                .Add("fechaCorte", fechaCorte)
                .Execute();
        }

        [Route("VerificarPagos(Cheques)")]
        [HttpPut]
        public ActionResult VerificarPagosACheques()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return Get("/PagosProgramados/VerificarPagosACheques")
                .Add("model", input.ToString())
                .Execute();
        }

    }
}