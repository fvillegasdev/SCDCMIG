using System.Web.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Web.Kontrol.Controllers
{
    public class GisController : EK.Common.BaseKontroller
    {

        [Route("Kontrol/gis/vistas/")]
        [HttpGet]
        public async Task<ActionResult> Vistas()
        {
            //var obj = ;
            return await Get("/Vistas/GetAll")
                .Add("parametros", new Dictionary<string, object>())
                .ExecuteAsync();
        }

        [Route("kontrol/gis/save/{vista}")]
        [HttpGet]
        public async Task<ActionResult> Save(EK.Modelo.Kontrol.Interfaces.IVistas vista)
        {
            //var obj = ;
            return await Get("/VistaElemento/Save").Add("elementos", vista)
                .ExecuteAsync();
        }
    }
}
