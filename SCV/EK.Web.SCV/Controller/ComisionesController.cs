using Newtonsoft.Json;
using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Collections.Generic;

using m = EK.Modelo;
using s = EK.Drivers.Storage;
using System.IO;

namespace EK.Web.SCV.Controller
{
    public class ComisionesController : EK.Common.BaseKontroller
    {
        private const string MODULO_EK = "SCV";
        private const string ENTIDAD_EK = "Comisiones";
        private const string ROUTE_EK = MODULO_EK + "/" + ENTIDAD_EK;
        private const string PROCESO_EK = "/" + MODULO_EK + ENTIDAD_EK;

        [Route(ROUTE_EK + "({activos})")]
        [Route(ROUTE_EK + "/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAll(int activos)
        {
            return await Get(PROCESO_EK + "/GetAll").Add("activos", activos).ExecuteAsync();
        }

        #region PERIODOS

        [Route(ROUTE_EK + "({activos})")]
        [Route(ROUTE_EK + "/DashBoard/Periodos/GetAll({activos})")]
        [HttpGet]
        public async Task<ActionResult> GetAllComisionesPeriodos(int activos)
        {
            return await Get(PROCESO_EK + "/GetAllComisionesPeriodos").Add("activos", activos).ExecuteAsync();
        }


        [Route(ROUTE_EK + "/DashBoard/Periodos/SavePeriodos")]
        [HttpPut]
        public async Task<ActionResult> SavePeriodos()
        {
            Request.InputStream.Position = 0;
            // var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            var input = Request.Form["item"];
            try
            {
                return await Get(PROCESO_EK + "/SavePeriodos").Add("item", input).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/DashBoard/Periodos/DeletePeriodo")]
        [HttpPut]
        public async Task<ActionResult> DeletePeriodo()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get(PROCESO_EK + "/DeletePeriodo").Add("id", obj.ID).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion PERIODOS
        #region PERIODO DETALLES

        [Route(ROUTE_EK + "/DashBoard/Periodos/GetDetallesPeriodo/{id}/{idFase?}")]
        [HttpGet]
        public async Task<ActionResult> GetAllComisionesPeriodoDetalles(int id,int? idFase)
        {
            return await Get(PROCESO_EK + "/GetAllComisionesPeriodoDetalles").
                Add("Id", id).
                Add("idFase", idFase)
                .ExecuteAsync();
        }


        [Route(ROUTE_EK + "/DashBoard/Periodos/SavePeriodoDetalle")]
        [HttpPut]
        public async Task<ActionResult> SavePeriodoDetalle()
        {
            Request.InputStream.Position = 0;
            var input = Request.Form["item"];
            try
            {
                return await Get(PROCESO_EK + "/SavePeriodoDetalle").Add("item", input).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/DashBoard/Periodos/DeletePeriodoDetalle")]
        [HttpPut]
        public async Task<ActionResult> DeletePeriodoDetalle()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get(PROCESO_EK + "/DeletePeriodoDetalle").Add("id", obj.ID).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
        #region UTILS

        [Route(ROUTE_EK + "/Imprimir")]
        public async Task<ActionResult> Imprimir()
        {
            dynamic data = await Get(PROCESO_EK + "/GetAll")
                .Add("activos", 0)
                .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            return new Rotativa.ViewAsPdf("~/Views/" + MODULO_EK + "/Reportes/" + ENTIDAD_EK + ".cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }


        [Route(ROUTE_EK + "/Exportar")]
        public async Task<ActionResult> Exportar()
        {
            dynamic data = await Get(PROCESO_EK + "/GetAll")
               .Add("activos", 0)
               .ExecuteAsync<JToken>();

            ViewBag.Data = data;

            ViewBag.Data = data;

            return new Excel().Exportar("Seguimientos", data);
        }

        [Route(ROUTE_EK + "/SendAuthorization/Seguimiento/Etapa")]
        [HttpPut]
        public async Task<ActionResult> EnviarAutorizacionEtapa()
        {
            Request.InputStream.Position = 0;
            var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            try
            {
                return await Get(PROCESO_EK + "/EnviarAutorizacion").Add("item", input).ExecuteAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
        #region PLAN ESQUEMA
        [Route(ROUTE_EK + "({activos})")]
        [Route(ROUTE_EK + "/DashBoard/PlanEsquemaPeriodos/GetAll/{idesquema}/{idFase}")]
        [HttpGet]
        public async Task<ActionResult> GetAllComisionesPlanEsquemaPeriodo(int IdEsquema,int IdFase)
        {
            return await Get(PROCESO_EK + "/GetAllComisionesPlanEsquemaPeriodo")
                .Add("IdEsquema", IdEsquema)
                .Add("IdFase", IdFase)
                .ExecuteAsync();
        }

        [Route(ROUTE_EK + "/DashBoard/PlanEsquemaPeriodos/SavePlanEsquemaPeriodos")]
        [HttpPut]
        public async Task<ActionResult> SaveComisionesPlanEsquemaPeriodo()
        {
            Request.InputStream.Position = 0;
            // var input = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
            var input = Request.Form["item"];
            try
            {
                return await Get(PROCESO_EK + "/SaveComisionesPlanEsquemaPeriodo").Add("item", input).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/DashBoard/PlanEsquemaPeriodos/DeletePlanEsquemaPeriodo")]
        [HttpPut]
        public async Task<ActionResult> DeleteComisionesPlanEsquemaPeriodo()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get(PROCESO_EK + "/DeleteComisionesPlanEsquemaPeriodo").Add("id", obj.ID).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //[Route(ROUTE_EK + "/DashBoard/PlanEsquemaPeriodos/GetDetallesPeriodo/{id}")]
        //[HttpGet]
        //public async Task<ActionResult> GetAllComisionesPlanEsquemaPeriodoDetalles(int id)
        //{
        //    return await Get(PROCESO_EK + "/GetAllComisionesPlanEsquemaPeriodoDetalles").Add("Id", id).ExecuteAsync();
        //}






        #endregion
        #region PLAN ESQUEMA DETALLE
        [Route(ROUTE_EK + "/DashBoard/PlanEsquemaPeriodosDetalles/GetDetallesPeriodosDetalles/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetAllComisionesPlanEsquemaPeriodoDetalles(int id)
        {
            return await Get(PROCESO_EK + "/GetAllComisionesPlanEsquemaPeriodoDetalles").Add("Id", id).ExecuteAsync();
        }

        [Route(ROUTE_EK + "/DashBoard/PlanEsquemaPeriodosDetalles/DeletePlanEsquemaPeriodoDetalle")]
        [HttpPut]
        public async Task<ActionResult> DeleteComisionesPlanEsquemaPeriodoDetalle()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get(PROCESO_EK + "/DeletePlanEsquemaPeriodoDetalle").Add("id", obj.ID).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [Route(ROUTE_EK + "/DashBoard/PlanEsquemaPeriodosDetalles/SavePeriodoDetalle")]
        [HttpPut]
        public async Task<ActionResult> SaveComisionesPlanEsquemaPeriodoDetalle()
        {
            Request.InputStream.Position = 0;
            var input = Request.Form["item"];
            try
            {
                return await Get(PROCESO_EK + "/SaveComisionesPlanEsquemaPeriodoDetalle").Add("item", input).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
        #region COMISION CONFIGURACIONES
        [Route(ROUTE_EK + "/DashBoard/Configuraciones/GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetByIdComisionConfiguracion(int id)
        {
            return await Get(PROCESO_EK + "/GetByIdComisionConfiguracion")
                .Add("id", id).ExecuteAsync();
        }

        [Route(ROUTE_EK + "/DashBoard/Configuraciones/GetAll/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetComisionConfiguraciones(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get(PROCESO_EK + "/GetComisionConfiguraciones")
               .Add("parametros", obj)
               .ExecuteAsync();
        }

        [Route(ROUTE_EK + "/DashBoard/Configuraciones/Save")]
        [HttpPut]
        public async Task<ActionResult> SaveComisionConfiguracion()
        {
            var input = base.GetInputData();

            return await Get(PROCESO_EK + "/SaveComisionConfiguracion")
                .Add("item", input)
                .ExecuteAsync();
        }

        [Route(ROUTE_EK + "/DashBoard/Configuraciones/Delete")]
        [HttpPut]
        public async Task<ActionResult> DeleteComisionConfiguracion()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                return await Get(PROCESO_EK + "/DeleteComisionConfiguracion")
                    .Add("id", obj.ID).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
        #region CALCULO DE COMISIONES
        [Route(ROUTE_EK + "/Calculo")]
        [HttpPut]
        public async Task<ActionResult> CalculoComisiones()
        {
            //var input = base.GetInputData();

            //return await Get(PROCESO_EK + "/Calculo")
            //    .Add("item", input)
            //    .ExecuteAsync();
            Request.InputStream.Position = 0;
            var input = Request.Form["item"];
            try
            {
                return await Get(PROCESO_EK + "/Calculo").Add("item", input).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route(ROUTE_EK + "/EstadoCuenta")]
        [HttpPut]
        public async Task<ActionResult> EstadoCuenta()
        {
  
            Request.InputStream.Position = 0;
            var input = Request.Form["item"];
            try
            {
                return await Get(PROCESO_EK + "/EstadoCuenta").Add("item", input).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
        #region ESTADO DE CUENTA
        [Route("Comisiones/{modulo}/{bp}/imprimir/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> Imprimir(string modulo, string bp, string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            dynamic data = await Get($"/{bp}/GetAll")
                .Add("parametros", obj)
                .ExecuteAsync<JToken>();
            ViewBag.Data = data;
            return new Rotativa.ViewAsPdf($"~/Views/{modulo}/Reportes/{bp}.cshtml")
            {
                PageSize = Rotativa.Options.Size.Letter,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Left = 10, Right = 10, Bottom = 10, Top = 10 }
            };
        }
        #endregion

    }
}