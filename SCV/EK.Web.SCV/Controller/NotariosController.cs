using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Web.Mvc;

namespace EK.Web.SCV.Controller
{
    public class NotariosController : EK.Common.BaseKontroller
    {
        [Route("Notarios({id},{activos})")]
        [Route("Notarios/GetAll({id},{activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int id, int activos)
        {
            return await Get("/Notarios/GetAll")
                .Add("id", id)
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("Notarios/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Notarios/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("Notarios/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return await Get("/Notarios/Save")
                .Add("notario", input)
                .ExecuteAsync();
        }

    }
}