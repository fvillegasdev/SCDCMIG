#if ENK
#else
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.Kontrol.Controllers
{
    public partial class CompaniasController
    {
        [Route("companias({activos = 0}/{todos= 0})")]
        [HttpGet]
        public async Task<ActionResult> Get(int activos = 0, int todos = 0)
        {
            return await Get("/Compañias/GetAll")
                .Add("activos", activos)
                .Add("todos", todos)
                .ExecuteAsync();
        }
    }
}
#endif