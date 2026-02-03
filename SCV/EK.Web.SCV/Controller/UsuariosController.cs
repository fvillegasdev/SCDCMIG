using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using web = System.Web.Http;

namespace EK.Web.SCV.Controller
{
    public class SCVUsuariosController
        : EK.Common.BaseKontroller
    {
        [Route("usuario/agente")]
        [HttpPost]
        public async Task<ActionResult> GetInfoAgente()
        {
            var input = base.GetInputObject();

            return await Get("/Agentes/GetByUserId").Add("id", input.id).ExecuteAsync();
        }

        [Route("usuario/showAddress/{address}")]
        public async Task<ActionResult> ShowAddress(string address)
        {
            ViewBag.Address = address;
            return await Task.Run(() => PartialView("_Address"));
        }
        //[Route("usuario/save/agente")]
        //[HttpPut]
        //public async Task<ActionResult> SaveAgente()
        //{
        //    var input = base.GetInputData();

        //    return await Get("/Agentes/Save").Add("agente", input).ExecuteAsync();
        //}

        //[Route("usuarios/Agentes/Buscar")]
        //[HttpPost]
        //public async Task<ActionResult> Search(string search)
        //{
        //    return await Get("/Agentes/Search")
        //        .Add("texto", search)
        //        .ExecuteAsync();
        //}
    }
}
