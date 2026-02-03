using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using EK.Common.Exportacion;

namespace EK.Web.SCV.Controller
{
    public class EsquemasController : EK.Common.BaseKontroller
    {
        #region "esquemas"

        [Route("esquemas/all/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetAll(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Esquemas/GetAll")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("esquemas/fase/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetAllFase(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Esquemas/GetAllFase")
                .Add("parametros", obj)
                .ExecuteAsync();
        }


        [Route("esquemas/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/Esquemas/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("esquemas/save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get("/Esquemas/Save")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("esquemas/delete")]
        [HttpPut]
        public async Task<ActionResult> Delete()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get("/Esquemas/Delete").Add("id", obj.id).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region "niveles"

        [Route("esquemas/niveles/all/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> ComputeNiveles(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Esquemas/ComputeNiveles")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("esquemas/niveles/delete")]
        [HttpPut]
        public async Task<ActionResult> DeleteNivel()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get("/Esquemas/DeleteNivel")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("esquemas/niveles/update")]
        [HttpPut]
        public async Task<ActionResult> UpdateNiveles()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            return await Get("/Esquemas/UpdateNiveles")
                .Add("item", input)
                .ExecuteAsync();
        }

        #endregion

        #region "etapas"

        [Route("esquemas/etapas/all/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetEtapas(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Esquemas/GetEtapas")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("esquemas/etapasxesquema/all/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetEtapasXEsquema(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Esquemas/GetEtapasXEsquema")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("esquemas/etapas/save")]
        [HttpPut]
        public async Task<ActionResult> SaveEtapa()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get("/Esquemas/SaveEtapa")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("esquemas/etapas/delete")]
        [HttpPut]
        public async Task<ActionResult> DeleteEtapa()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get("/Esquemas/DeleteEtapa")
                    .Add("id", obj.ID)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region "requisitos"

        [Route("esquemas/requisitos/all/{filtros}")]
        public async Task<ActionResult> GetRequisitos(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Esquemas/GetRequisitos")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("esquemas/requisitos/save")]
        [HttpPut]
        public async Task<ActionResult> SaveRequisito()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get("/Esquemas/SaveRequisito")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("esquemas/requisitos/delete")]
        [HttpPut]
        public async Task<ActionResult> DeleteRequisito()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get("/Esquemas/DeleteRequisito")
                    .Add("id", obj.ID)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region "documentos"

        [Route("esquemas/documentos/all/{filtros}")]
        public async Task<ActionResult> GetDocumentos(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Esquemas/GetDocumentos")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("esquemas/documentos/save")]
        [HttpPut]
        public async Task<ActionResult> SaveDocumento()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get("/Esquemas/SaveDocumento")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("esquemas/documentos/delete")]
        [HttpPut]
        public async Task<ActionResult> DeleteDocumento()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get("/Esquemas/DeleteDocumento")
                    .Add("id", obj.ID)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region "procesos"

        [Route("esquemas/procesos/all/{filtros}")]
        public async Task<ActionResult> GetProcesos(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/Esquemas/GetProcesos")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("esquemas/procesos/save")]
        [HttpPut]
        public async Task<ActionResult> SaveProceso()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();

            try
            {
                return await Get("/Esquemas/SaveProceso")
                    .Add("item", input)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("esquemas/procesos/delete")]
        [HttpPut]
        public async Task<ActionResult> DeleteProceso()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get("/Esquemas/DeleteProceso")
                    .Add("id", obj.ID)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        [Route("esquemas/GetEsquemasInstitucion({idInstitucion})")]
        [Route("esquemas/GetEsquemasInstitucion/{idInstitucion}")]
        public async Task<ActionResult> GetEsquemasInstitucion(int idInstitucion)
        {
            return await Get("/Esquemas/GetEsquemasInstitucion")
                .Add("idInstitucion", idInstitucion)
                .ExecuteAsync();
        }

        [Route("esquemas/exportar/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> Exportar(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            dynamic data = await Get("/Esquemas/GetAll")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Excel().Exportar("esquemas", data);
        }

        //[Route("esquemas/print")]
        //[HttpGet]
        //public async Task<ActionResult> Imprimir()
        //{
        //    var obj = new Dictionary<string, object>() { { "activos", 0 } };

        //    ViewBag.Data = await Get("/Esquemas/GetAll")
        //        .Add("parametros", obj)
        //        .ExecuteAsync<JToken>();

        //    return new Rotativa.ViewAsPdf("~/Views/SCV/Reportes/Esquemas.cshtml")
        //    {
        //        PageSize = Rotativa.Options.Size.Letter,
        //        PageOrientation = Rotativa.Options.Orientation.Portrait,
        //        PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
        //    };
        //}

        //[Route("esquemas/Exportar")]
        //public async Task<ActionResult> Exportar()
        //{
        //    dynamic obj = await Get("/Esquemas/GetAll")
        //        .Add("activos", 0)
        //        .ExecuteAsync<JToken>();

        //    Configurar configuracion = new Configurar();
        //    configuracion.NombreArchivoDescarga = "Esquemas.xlsx";
        //    configuracion.NombreHojaTrabajo = "Esquemas";
        //    configuracion.TamañoFuente = 11;
        //    configuracion.NombreFuente = "Calibri";

        //    configuracion.Columnas = new List<Configurar.Columna>();
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Clave", Campo = "Clave" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Nombre", Campo = "Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Tipo Financiamiento", Campo = "TipoFinanciamiento.Nombre" });
        //    configuracion.Columnas.Add(new Configurar.Columna() { Titulo = "Estatus", Campo = "Estatus.Nombre" });
        //    return new Excel().ConvertirAExcel(obj, configuracion);
        //}
    }
}
