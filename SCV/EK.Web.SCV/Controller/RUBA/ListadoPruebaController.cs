using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EK.Web.SCV.Controller
{
    public class ListadoPruebaController : EK.Common.BaseKontroller
    {
        [Route("ListadoPrueba/GetPruebas/")]
        [HttpPost]
        public async Task<ActionResult> GetPruebas()
        {
            var obj = base.GetDictionary();

            return await Get("/ListadoPrueba/GetPruebas")
                .Add("parametros", obj)
                .ExecuteAsync();

        }

        [Route("ListadoPrueba/GetAll")]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return await Get("/ListadoPrueba/GetAll")
                .ExecuteAsync();
        }

        [Route("ListadoPrueba/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/ListadoPrueba/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("ListadoPrueba/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return await Get("/ListadoPrueba/Save")
                .Add("item", input)
                .ExecuteAsync();
        }
    }
}