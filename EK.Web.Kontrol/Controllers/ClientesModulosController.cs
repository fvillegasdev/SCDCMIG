using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public class ClientesModulosController : EK.Common.BaseKontroller
    {
        public ClientesModulosController() : base()
        {
        }

        [Route("ClientesModulos")]
        [Route("ClientesModulos/Get")]
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return await Get("/ClientesModulos/Get")
                .ExecuteAsync();
        }
    }
}