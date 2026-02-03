using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EK.Web.SCV.Controller
{
    public class EntregaPaquetesController : EK.Common.BaseKontroller
    {
        [Route("EntregaPaquetes/GetEntregaPaquetes/")]
        [HttpPost]
        public async Task<ActionResult> GetEntregaPaquetes()
        {
            var input = base.GetInputObject();
            var Plaza= Convert.ToString(input.PlazaInicial.id_identificador );
            var FechaInicial = Convert.ToDateTime(input.FechaInicio);
            var FechaFinal = Convert.ToDateTime(input.FechaFinal);
            var Segmentos = Convert.ToString(input.Segmentos.clave_tipo_vivienda);
            var Fraccionamiento = Convert.ToString(input.FraccInicial.ID);

               
            //
            return await Get("/EntregaPaquetes/GetEntregaPaquetes")
                .Add("Plaza", Plaza)
                .Add("FechaInicial", FechaInicial)
                .Add("FechaFinal", FechaFinal)
                .Add("Segmentos", Segmentos)
                .Add("Fraccionamiento", Fraccionamiento)
                .ExecuteAsync();
        }
    }
}