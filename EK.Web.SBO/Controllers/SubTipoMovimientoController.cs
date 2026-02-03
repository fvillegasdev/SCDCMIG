using System.Web.Mvc;

namespace EK.Web.SBO.Controllers
{
    public class SubTipoMovimientoController : EK.Common.BaseKontroller
    {

        public SubTipoMovimientoController()
            : base()
        {
        }

        [Route("subtipomovimiento")]
        [Route("SubTipoMovimiento/GetAll")]
        [HttpGet]
        public ActionResult GetAll()
        {
            return Get("/SubTipoMovimiento/GetAll").Execute();
        }

        [Route("subtipomovimiento({id})")]
        [Route("SubTipoMovimiento/GetById/{id}")]
        [HttpGet]
        public ActionResult GetById(int id)
        {
            return Get("/SubTipoMovimiento/GetById").Add("id", id).Execute();
        }

        [Route("subtipomovimiento/GetByIdTipo/{id}")]
        [Route("SubTipoMovimiento/GetByIdTipo/{id}")]
        [HttpGet]
        public ActionResult GetByIdTipo(int idTipoMovimiento)
        {
            return Get("/SubTipoMovimiento/GetById").Add("idTipoMovimiento", idTipoMovimiento).Execute();
        }


        [Route("subtipomovimiento/update")]
        [Route("SubTipoMovimiento/Save")]
        [HttpPut]
        public ActionResult Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return Get("/SubTipoMovimiento/Update")
                .Add("subtm", input)
                .Execute();
        }

        [Route("subtipomovimiento/insert")]
        [HttpPut]
        public ActionResult Insert()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return Get("/SubTipoMovimiento/Insert")
                .Add("subtm", input)
                .Execute();
        }

    }
}
