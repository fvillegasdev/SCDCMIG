//using EK.Common.Exportacion;
//using Newtonsoft.Json.Linq;
//using System.Collections.Generic;
//using System.IO;
//using System.Threading.Tasks;
//using System.Web.Mvc;

//namespace EK.Web.Kontrol.Controllers
//{
//    [Authorize]
//    public class ClientesController
//        : EK.Common.BaseKontroller
//    {
//        public ClientesController() : base()
//        {
//        }

//        [Route("clientes")]
//        [Route("Clientes/GetClientes")]
//        [HttpGet]
//        public async Task<ActionResult> GetClientes()
//        {
//            return await Get("/Clientes/Get").ExecuteAsync();
//        }

//        [Route("clientes/key-value")]
//        [Route("Clientes/KV")]
//        [HttpGet]
//        public async Task<ActionResult> KV()
//        {
//            return await Get("/Clientes/GetKV").ExecuteAsync();
//        }

//        [Route("cliente({id})")]
//        [Route("Clientes/GetById/{id}")]
//        [HttpGet]
//        public async Task<ActionResult> GetById(int id)
//        {
//            return await Get("/Clientes/GetById").Add("ID", id).ExecuteAsync();
//        }

//        [HttpPost]
//        public async Task<ActionResult> Search(string search)
//        {
//            return await Get("/Clientes/Search").Add("nombre", search).ExecuteAsync();
//        }

//        [Route("clientes/update")]
//        [Route("Clientes/Save")]
//        [HttpPut]
//        public async Task<ActionResult> Save()
//        {
//            var input = base.GetInputData();
//            var retValue = await Get("/Clientes/Save").Add("cliente", input).ExecuteAsync();

//            return retValue;
//        }

//        [Route("Clientes/GetModulos")]
//        [HttpGet]
//        public async Task<ActionResult> GetModulos()
//        {
//            return await Get("/Clientes/GetModulos")
//                .ExecuteAsync();
//        }

//        //public async Task<ActionResult> Exportar()
//        //{
//        //    dynamic obj = await Get("/Clientes/Get").ExecuteAsync<JToken>();
//        //    Configurar configuracion = new Configurar();
//        //    configuracion.NombreArchivoDescarga = "Dominio.xlsx";
//        //    configuracion.NombreHojaTrabajo = "Dominio";
//        //    configuracion.TamañoFuente = 11;
//        //    configuracion.NombreFuente = "Calibri";
//        //    configuracion.Columnas = new List<Configurar.Columna>();
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Vigente desde", Campo = "VigenciaInicio" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Vigente hasta", Campo = "VigenciaFin" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
//        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
//        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
//        //}

//        [HttpGet]
//        public async Task<ActionResult> Imprimir()
//        {
//            ViewBag.Data = await Get("/Clientes/Get").ExecuteAsync<JToken>();
//            return new Rotativa.ViewAsPdf("~/Views/Kontrol/Reportes/CatalogoClientes.cshtml")
//            {
//                PageSize = Rotativa.Options.Size.Letter,
//                PageOrientation = Rotativa.Options.Orientation.Portrait,
//                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
//            };
//        }
//    }
//}