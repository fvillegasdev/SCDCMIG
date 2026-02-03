//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using EK.Common.Exportacion;
//using Newtonsoft.Json.Linq;
//using System.Web.Mvc;

//namespace EK.Web.SCV.Controller
//{
//    public class EtapasController : EK.Common.BaseKontroller
//    {
//        [Route("Etapas({id},{activos})")]
//        [Route("Etapas/GetAll({id},{activos})")]
//        [HttpGet]
//        public async Task<ActionResult> GetAll(int id, int activos)
//        {
//            return await Get("/Etapas/GetAll")
//                .Add("id", id)
//                .Add("activos", activos)
//                .ExecuteAsync();
//        }

//       // [Route("etapas({id})")]
//        [Route("Etapas/GetById/{id}")]
//        public async Task<ActionResult> GetById(int id)
//        {
//            return await Get("/Etapas/GetById")
//                .Add("id", id)
//                .ExecuteAsync();
//        }

//        [Route("Etapas/Save")]
//        [HttpPut]
//        public async Task<ActionResult> Save()
//        {
//            Request.InputStream.Position = 0;
//            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
//            return await Get("/Etapas/Save")
//                .Add("item", input)
//                .ExecuteAsync();
//        }

//        //[Route("Etapas/history")]
//        //public async Task<ActionResult> GetHistory()
//        //{
//        //    return await Get("/Etapas/GetHistory")
//        //        .Add("top", 25)
//        //        .ExecuteAsync();
//        //}

//        //[Route("Etapas/history({id})")]
//        //public async Task<ActionResult> GetHistoryById(string id)
//        //{
//        //    return await Get("/Etapas/GetHistory")
//        //        .Add("ID", id)
//        //        .Add("top", 25)
//        //        .ExecuteAsync();
//        //}

//        //public async Task<ActionResult> Imprimir()
//        //{
//        //    ViewBag.Data = await Get("/Etapas/GetAll")
//        //         .Add("id", 0)
//        //        .Add("activos", 0)
//        //        .ExecuteAsync<JToken>();

//        //    return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Etapas.cshtml")
//        //    {
//        //        PageSize = Rotativa.Options.Size.Letter,
//        //        PageOrientation = Rotativa.Options.Orientation.Portrait,
//        //        PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
//        //    };
//        //}

        
//    }
//}