using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EK.Web.SBO.Controllers
{
    public class TipoMovimientoController : EK.Common.BaseKontroller
    {
        public TipoMovimientoController()
            : base()
        {
        }

        [Route("tipomovimiento")]
        [Route("TipoMovimiento/GetAll")]
        [HttpGet]
        public ActionResult GetAll()
        {
            return Get("/TipoMovimiento/GetAll").Execute();
        }

        [Route("tipomovimiento/GetTipoMovimientoxSub")]
        [HttpGet]
        public ActionResult GetTipoMovimientoxSub()
        {
            return Get("/TipoMovimiento/GetTipoMovimientoxSub").Execute();
        }

        [Route("tipomovimiento({id})")]
        [Route("TipoMovimiento/GetById/{id}")]
        [HttpGet]
        public ActionResult GetById(int id)
        {
            return Get("/TipoMovimiento/GetById").Add("id", id).Execute();
        }

        [Route("tipomovimiento/update")]
        [Route("TipoMovimiento/Save")]
        [HttpPut]
        public ActionResult Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return Get("/TipoMovimiento/Update")
                .Add("tipomovimiento", input)
                .Execute();
        }

        [Route("tipomovimiento/insert")]
        [HttpPut]
        public ActionResult Insert()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return Get("/TipoMovimiento/Insert")
                .Add("tipomovimiento", input)
                .Execute();
        }

        //public ActionResult Exportar()
        //{
        //    dynamic obj = Get("/TipoMovimiento/GetAll").Execute<JToken>();
        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Tipos_de_Movimientos.xlsx";
        //    configuracion.NombreHojaTrabajo = "Tipos de Movimientos";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Naturaleza", Campo = "Naturaleza" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripción", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Usa Sub Tipo", Campo = "UsaSubTipo" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}


        [Route("tipomovimiento/TMClasificador({idTipoClasificador}/{idClasificador}/{todos})")]
        [HttpGet]
        public ActionResult GetTMClasificador(int idTipoClasificador, int idClasificador, int todos)
        {

            return Get("/TipoMovimiento/GetTMClasificador")
                .Add("idTipoClasificador", idTipoClasificador)
                .Add("idClasificador", idClasificador)
                .Add("todos", todos)
                .Execute();
        }

    }
}
