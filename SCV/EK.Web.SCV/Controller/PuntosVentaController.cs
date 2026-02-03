using System;
using System.Threading.Tasks;
using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EK.Web.SCV.Controller
{
    public class PuntosVentaController : EK.Common.BaseKontroller
    {
        [Route("PuntosVenta({id},{activos})")]
        [Route("PuntosVenta/GetAll({id},{activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int id, int activos)
        {
            return await Get("/PuntosVenta/GetAll")
                .Add("id", id)
                .Add("activos", activos)
                .ExecuteAsync();
        }

        [Route("PuntosVenta/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/PuntosVenta/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("PuntosVenta/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            return await Get("/PuntosVenta/Save")
                .Add("puntoventa", input)
                .ExecuteAsync();
        }
    }
}
