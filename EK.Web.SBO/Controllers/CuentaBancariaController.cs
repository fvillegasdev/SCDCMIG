using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using EK.Common.Exportacion;


namespace EK.Web.SBO.Controllers
{
    public class CuentaBancariaController : EK.Common.BaseKontroller
    {
        public CuentaBancariaController()
            : base()
        {
        }

        [Route("cuentabancaria")]
        [Route("cuentabancaria/GetAll")]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return await Get("/CuentaBancaria/GetAll").ExecuteAsync();
        }

        [Route("cuentabancaria({id})")]
        [Route("cuentabancaria/GetById/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/CuentaBancaria/GetById").Add("id", id).ExecuteAsync();
        }

        [Route("Getbybank({idBanco}/{idCompania})")]
        [Route("cuentabancaria/GetByBank/{idBanco}/{idCompania}")]
        public async Task<ActionResult> GetByBank(int idBanco, int idCompania)
        {
            return await Get("/CuentaBancaria/GetByBank")
                        .Add("idBanco", idBanco)
                        .Add("idCompania", idCompania)
                        .ExecuteAsync();
        }

 
        [Route("cuentabancaria/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            
            return await Get("/CuentaBancaria/Save")
                .Add("cb", input)
                .ExecuteAsync();
        }

        public ActionResult Imprimir()
        {
            ViewBag.Data = Get("/CuentaBancaria/GetAll").Execute<JToken>();

            return new Rotativa.ViewAsPdf("~/Views/SBO/Reportes/CatalogoCuentas.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }

        //public ActionResult Exportar()
        //{
        //    dynamic obj = Get("/CuentaBancaria/GetAll").Execute<JToken>();
        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "CuentasBancarias.xlsx";
        //    configuracion.NombreHojaTrabajo = "CuentasBancarias";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";
        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Descripción", Campo = "Descripcion" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Banco", Campo = "Banco.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Moneda", Campo = "Moneda.Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Centro de Costo", Campo = "IdCentroCosto" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Tipo Póliza", Campo = "TipoPoliza.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado", Campo = "Creado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Creado Por", Campo = "CreadoPor.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado", Campo = "Modificado" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Modificado Por", Campo = "ModificadoPor.Nombre" });
        //    return new Excel().ConvertirAExcel(obj.Resultado, configuracion);
        //}

        
        [Route("cuentabancaria/CuentasClasificador({idTipoClasificador}/{idClasificador}/{todos}/{idBanco})")]
        [HttpGet]
        public ActionResult GetCuentasClasificador(int idTipoClasificador, int idClasificador, int todos, int idBanco)
        {
          
            return Get("/CuentaBancaria/GetCuentasClasificador")
                .Add("idTipoClasificador", idTipoClasificador)
                .Add("idClasificador", idClasificador)
                .Add("todos", todos)
                .Add("idBanco", idBanco)
                .Execute();
        }

        [Route("cuentabancaria/history({id})")]
        [HttpGet]
        public ActionResult GetHistory(int id)
        {
            return Get("/CuentaBancaria/GetHistory")
                .Add("ID", id)
                .Add("top", 25)
                .Execute();
        }

        [Route("cuentabancaria/history")]
        public ActionResult GetHistory()
        {
            return Get("/CuentaBancaria/GetHistory")
                .Add("top", 25)
                .Execute();
        }


    }
}
