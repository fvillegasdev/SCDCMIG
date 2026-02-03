//using System.Collections.Generic;
//using System.Threading.Tasks;
//using System.Web.Mvc;

//using Newtonsoft.Json.Linq;
//using EK.Common.Exportacion;

//namespace EK.Web.SCV.Controller
//{
//    public class CentralesObrerasController : EK.Common.BaseKontroller
//    {
//        [Route("CentralesObreras({activos})")]
//        [Route("CentralesObreras/GetAll({activos})")]
//        [HttpGet]
//        public async Task<ActionResult> GetAll(int activos)
//        {
//            return await Get("/CentralesObreras/GetAll")
//                .Add("activos", activos)
//                .ExecuteAsync();
//        }

//        [Route("CentralesObreras/GetById/{id}")]
//        public async Task<ActionResult> GetById(int id)
//        {
//            return await Get("/CentralesObreras/GetById")
//                .Add("id", id)
//                .ExecuteAsync();
//        }

//        [Route("CentralesObreras/Save")]
//        [HttpPut]
//        public async Task<ActionResult> Save()
//        {
//            Request.InputStream.Position = 0;
//            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

//            return await Get("/CentralesObreras/Save")
//                .Add("centralObrera", input)
//                .ExecuteAsync();
//        }

//        [Route("CentralesObreras/Imprimir")]
//        public async Task<ActionResult> Imprimir()
//        {
//            ViewBag.Data = await Get("/CentralesObreras/GetAll")
//                .Add("activos", 0)
//                .ExecuteAsync<JToken>();

//            return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/CentralesObreras.cshtml")
//            {
//                PageSize = Rotativa.Options.Size.Letter,
//                PageOrientation = Rotativa.Options.Orientation.Portrait,
//                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
//            };
//        }

//        //[Route("CentralesObreras/Exportar")]
//        //public async Task<ActionResult> Exportar()
//        //{
//        //    dynamic obj = await Get("/CentralesObreras/GetAll")
//        //        .Add("activos", 0)
//        //        .ExecuteAsync<JToken>();

//        //    Configurar configuracion = new Configurar();
//        //    configuracion.NombreArchivoDescarga = "CentralesObreras.xlsx";
//        //    configuracion.NombreHojaTrabajo = "CentralesObreras";
//        //    configuracion.TamañoFuente = 11;
//        //    configuracion.NombreFuente = "Calibri";

//        //    configuracion.Columnas = new List<Configurar.Columna>();
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
//        //    return new Excel().ConvertirAExcel(obj, configuracion);
//        //}
//    }
//}
