using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    [Authorize]
    public class CatalogosGeneralesController
        : EK.Common.BaseKontroller
    {
        public CatalogosGeneralesController()
            : base()
        {
        }

        [HttpGet]
        public ActionResult GetItems(string id)
        {
            return Get("/CatalogosGenerales/Get").Add("clave", id).Execute();
        }

        [Route("catalogo({clave})/history")]
        public ActionResult GetHistory(string clave) {
            return Get("/CatalogosGeneralesValores/GetHistory")
                .Add("clave", clave)
                .Add("top", 25)
                .Execute();
        }

        [Route("catalogo({clave})/history({id})")]
        public ActionResult GetHistoryById(string clave, string id)
        {
            return Get("/CatalogosGeneralesValores/GetHistory")
                .Add("clave", clave)
                .Add("ID", id)
                .Add("top", 25)
                .Execute();
        }
    }
}