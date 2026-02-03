#if ENK
#else
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public partial class UsuariosController
    {
        [Route("usuarios")]
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return await Get("/Usuarios/Get").ExecuteAsync();
        }
    }
}
#endif