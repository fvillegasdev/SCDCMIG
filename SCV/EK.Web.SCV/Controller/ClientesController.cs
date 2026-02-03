using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;

using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Web.SCV.Controller
{
    public class ClientesController 
        : EK.Common.BaseKontroller
    {
 

        [Route("SCV/Clientes/RFC")]
        [HttpPost]
        public async Task<ActionResult> GetRFC()
        {
            var obj = base.GetDictionary();

            return await Get($"/ScvClientes/GetRFC")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("SCV/Clientes/CURP")]
        [HttpPost]
        public async Task<ActionResult> GetCURP()
        {
            var obj = base.GetDictionary();

            return await Get($"/ScvClientes/GetCURP")
                .Add("parametros", obj)
                .ExecuteAsync();
        }



        [Route("SCV/Clientes/Address/{address}/{isGeo}")]
        public async Task<ActionResult> Address(string address, bool isGeo)
        {
            ViewBag.Address = address;
            ViewBag.IsGeo = isGeo.ToString().ToLower();
            return await Task.Run(() => PartialView("_Address"));
            //return await Get("/notificaciones/GetAllNotifications").ExecuteAsync();
        }

        [Route("SCV/Clientes/Marker/")]
        public async Task<ActionResult> Marker()
        {
            return await Task.Run(() => PartialView("_Marker"));
            //return await Get("/notificaciones/GetAllNotifications").ExecuteAsync();
        }

        [Route("SCV/Clientes/SinExpediente/")]
        public async Task<ActionResult> GetAllClientesSinExpediente()
        {
            return await Get("/ScvClientes/GetAllClientesSinExpediente")
                .ExecuteAsync();
        }
        //[Route("Vivienda/Clientes/GetConyugeById({id})")]
        //[HttpGet]
        //public async Task<ActionResult> GetConyugeById(int id)
        //{
        //    return await Get("/ScvClientes/GetConyugeById")
        //      .Add("id", id)
        //      .ExecuteAsync();
        //}

        //[Route("SCV/Clientes/InfoAdicional")]
        //[HttpPost]
        //public async Task<ActionResult> GetInformacionAdicional()
        //{
        //    dynamic obj = base.GetInputObject();

        //    return await Get($"/ScvClientes/GetInformacionAdicional")
        //        .Add("parametros", new Dictionary<string, object>() { { "id", obj.id } })
        //        .ExecuteAsync();
        //}

        //public object[] GetAll(int activos)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //                {
        //                    { "id", DBNull.Value },
        //                    { "activos", activos }
        //                 };

        //        return helper.CreateEntities(USP_SCV_EMPRESAS_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        //public async Task<ActionResult> Imprimir()
        //{
        //    ViewBag.Data = await Get("/ScvClientes/GetAll")
        //         .Add("id", 0)
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Clientes.cshtml")
        //    {
        //        PageSize = Rotativa.Options.Size.Letter,
        //        PageOrientation = Rotativa.Options.Orientation.Portrait,
        //        PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
        //    };
        //}

    }
}
