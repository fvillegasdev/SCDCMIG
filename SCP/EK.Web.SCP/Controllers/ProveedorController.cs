using System;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace EK.Web.SCP
{
    public class ProveedorController : EK.Common.BaseKontroller
    {
        public ProveedorController() : base() {
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return await Get("/Proveedores/Get").ExecuteAsync();
        }

        [Route("proveedores/search")]
        [HttpPost]
        public async Task<ActionResult> Search(string search)
        {
            return await Get("/Proveedores/Search")
                .Add("parametro", search)
                .ExecuteAsync();
        }
    }
}