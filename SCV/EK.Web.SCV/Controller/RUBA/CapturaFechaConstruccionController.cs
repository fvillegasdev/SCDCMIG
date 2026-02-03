using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Common.Exportacion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EK.Web.SCV.Controller
{
    public class CapturaFechaConstruccionController : EK.Common.BaseKontroller
    {


        [Route("CapturaFechaConstruccion/GetMotivosReprogramacion/")]
        [HttpPost]
        public async Task<ActionResult> GetMotivosReprogramacion()
        {
            //return await Get("/CapturaFechaConstruccion/GetMotivosReprogramacion")
            //    .Add("parametros", obj)
            //    .ExecuteAsync();
            var obj = base.GetDictionary();
            var command = Get("/CapturaFechaConstruccion/GetMotivosReprogramacion"); 

            if (obj != null){
                foreach (var e in obj){
                    command.Add(e.Key, e.Value);
                }
            }
            return await command.ExecuteAsync();
        }
        [Route("CapturaFechaConstruccion/GetMotivosRezago/")]
        [HttpPost]
        public async Task<ActionResult> GetMotivosRezago()
        {
            //return await Get("/CapturaFechaConstruccion/GetMotivosReprogramacion")
            //    .Add("parametros", obj)
            //    .ExecuteAsync();
            var obj = base.GetDictionary();
            var command = Get("/CapturaFechaConstruccion/GetMotivosRezago");

            if (obj != null)
            {
                foreach (var e in obj)
                {
                    command.Add(e.Key, e.Value);
                }
            }
            return await command.ExecuteAsync();
        }
        [Route("CapturaFechaConstruccion/GetMotivosRecepcionDetalle/")]
        [HttpPost]
        public async Task<ActionResult> GetMotivosRecepcionDetalle()
        {
            //return await Get("/CapturaFechaConstruccion/GetMotivosReprogramacion")
            //    .Add("parametros", obj)
            //    .ExecuteAsync();
            var obj = base.GetDictionary();
            var command = Get("/CapturaFechaConstruccion/GetMotivosRecepcionDetalle");

            if (obj != null)
            {
                foreach (var e in obj)
                {
                    command.Add(e.Key, e.Value);
                }
            }
            return await command.ExecuteAsync();
        }
        [Route("CapturaFechaConstruccion/GetMotivosCancelacionFolio/")]
        [HttpPost]
        public async Task<ActionResult> GetMotivosCancelacionFolio()
        {
            //return await Get("/CapturaFechaConstruccion/GetMotivosReprogramacion")
            //    .Add("parametros", obj)
            //    .ExecuteAsync();
            var obj = base.GetDictionary();
            var command = Get("/CapturaFechaConstruccion/GetMotivosCancelacionFolio");

            if (obj != null)
            {
                foreach (var e in obj)
                {
                    command.Add(e.Key, e.Value);
                }
            }
            return await command.ExecuteAsync();
        }

        //[Route("CapturaFechaConstruccion/GetFechaConstruccion/")]
        //[HttpPost]
        //public async Task<ActionResult> GetFechaConstruccion()
        //{


        //    var obj = base.GetDictionary();

        //    return await Get("/CapturaFechaConstruccion/GetFechaConstruccion")
        //        .Add("parametros", obj)
        //        .ExecuteAsync();

        //}

        //Export to Excel
        [Route("CapturaFechaConstruccion/Excel/")]
        [HttpPost]
        public async Task<ActionResult> GetPreviewReport()
        {
            var input = Request.Form["data"]; // base.GetInputData();
            dynamic obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(input);

            dynamic data = await Get("/CapturaFechaConstruccion/GetFechaConstruccionExcel")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;
            foreach(var d in data){
                DateTime FechaHoraEscrituracion = DateTime.Now;
                DateTime FechaHoraEntrega = DateTime.Now;
                foreach (var key in d)
                {

                    switch(key.Name)
                    {
                        case "FechaEscrituracion":
                            var fechaEsc = key.Value.Value;
                            if (fechaEsc != null)
                            {
                                FechaHoraEscrituracion = fechaEsc;
                                key.Value = fechaEsc.ToString("dd/MM/yyyy");
                            }
                            break;
                        case "HoraEscrituracion":
                            if (FechaHoraEscrituracion != DateTime.Now)
                            {
                                key.Value = FechaHoraEscrituracion.ToString("hh:mm tt");
                            }
                            break;
                        case "FechaEntrega":
                            var fechaEnt = key.Value.Value;
                            if (fechaEnt != null)
                            {
                                FechaHoraEntrega = fechaEnt;
                                key.Value = fechaEnt.ToString("dd/MM/yyyy");
                            }
                            break;
                        case "HoraEntrega":
                            if (FechaHoraEntrega != DateTime.Now)
                            {
                                key.Value = FechaHoraEntrega.ToString("hh:mm tt");
                            }
                            break;
                    }

                    //if(key.Name == "FechaEntrega")
                    //{
                    //    var fecha = key.Value.Value;
                    //    if(fecha != null)
                    //    {
                    //        FechaHora = fecha;
                    //        key.Value = fecha.ToString("dd/MM/yyyy");
                    //    }                        
                    //}
                    //if(key.Name == "HoraEntrega")
                    //{

                    //    if(FechaHora != DateTime.Now)
                    //    {
                    //        key.Value = FechaHora.ToString("hh:mm tt");
                    //    }
                    //}
                    //var c = key.Value;

                }
            }
            //var t = data[0].FechaEntrega;
            return new Excel().Exportar("CapturaFechaConstruccion", data);

        }

        [Route("CapturaFechaConstruccion/SaveProgramados/")]
        [HttpPost]
        public async Task<ActionResult> SaveProgramados()
        {

            var input = base.GetInputData();
           
            return await Get("/CapturaFechaConstruccion/SaveProgramados")
                .Add("model", input)
                .ExecuteAsync();

        }


        [Route("CapturaFechaConstruccion/GetProgramados/")]
        [HttpPost]
        public async Task<ActionResult> GetProgramados()
        {

            var obj = base.GetDictionary();

            return await Get("/CapturaFechaConstruccion/GetProgramados")
                .Add("parametros", obj)
                .ExecuteAsync();

        }

        [Route("CapturaFechaConstruccion/GetPersonaEntregaVxFracc/{filtros?}")]
        [HttpPost]
        public async Task<ActionResult> GetPersonaEntregaVxFracc()
        {

            var obj = base.GetDictionary();

            return await Get("/CapturaFechaConstruccion/GetPersonaEntregaVxFracc")
                .Add("parametros", obj)
                .ExecuteAsync();

        }

    }
}