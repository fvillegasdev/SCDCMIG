#if ENK
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public partial class UsuariosController
    {
        [Route("cliente({id})/usuarios")]
        [Route("Usuarios/GetByClienteID/{id}")]
        [HttpGet]
        public ActionResult GetByClienteID(int ID)
        {
            return Get("/Usuarios/GetByClienteID").Add("ID", ID).Execute();
        }
    }
}
#endif