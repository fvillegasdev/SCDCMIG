using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public class OpcionesController : EK.Common.BaseKontroller
    {
        public OpcionesController() : base()
        {

        }

        [Route("opciones")]
        [Route("Opciones/GetAll/{idmodulo}")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int idmodulo)
        {
            return await Get("/Opciones/GetAll")
                .Add("idmodulo", idmodulo)
                .ExecuteAsync();
        }

        [Route("opciones({id})")]
        [Route("Opciones/GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Opciones/GetById").Add("id", id).ExecuteAsync();
        }

        [HttpPut]
        public async Task<ActionResult> Save()
        {
            var input = base.GetInputData();

            return await Get("/Opciones/Update")
                .Add("opcion", input)
                .ExecuteAsync();
        }

        [HttpPut]
        public async Task<ActionResult> Insert()
        {
            var input = base.GetInputData();

            return await Get("/Opciones/Insert")
                .Add("opcion", input)
                .ExecuteAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Search(string search)
        {
            return await Get("/Opciones/Search").Add("nombre", search).ExecuteAsync();
        }
    }
}
