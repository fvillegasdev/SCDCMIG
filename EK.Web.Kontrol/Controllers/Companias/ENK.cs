#if ENK
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public partial class CompaniasController
    {
        [Route("cliente({idCliente})/companias({activos}/{todos})")]
        [Route("Companias/GetAll/{idcliente}/{activos}/{todos}")]
        [HttpGet]
        public ActionResult GetAll(int idCliente = 0, int activos = 0, int todos = 0)
        {
            return Get("/Compañias/GetAll")
                    .Add("idcliente", idCliente)
                    .Add("activos", activos)
                    .Add("todos", todos)
                    .Execute();
        }
    }
}
#endif