using System.Web.Mvc;

namespace EK.Web.SCO.Controllers
{
    public class CentroCostoController : EK.Common.BaseKontroller
    {
        [Route("CentroCosto/{activos}")]
        [Route("CentroCosto/GetAll({activos})")]
        [HttpGet]
        public ActionResult GetAll(string activos)
        {
            return Get("/CentrosCosto/GetAll")
            .Add("activos", activos)
            .Execute();
        }

        [HttpPost]
        public ActionResult Search(string search)
        {
            return Get("/CentrosCosto/Search")
                .Add("parametro", search)
                .Execute();
        }
    }
}
