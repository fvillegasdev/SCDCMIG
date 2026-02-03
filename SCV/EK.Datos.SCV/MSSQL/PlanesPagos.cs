using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;
using modelSCV = EK.Modelo.SCV.Interfaces;
using miSCV = EK.Modelo.SCV.Interfaces;


namespace EK.Datos.SCV.MSSQL
{
    public class PlanesPagos
        : dk.DAOBaseGeneric<m.IPlanPagos>, d.IPlanesPagos
    {
        private const string ENTITY_NAME = "scv_Planes_Pagos";
        private const string USP_SCV_PLANES_PAGO_SELECT = "usp_scv_Planes_Pagos_select";
        private const string USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_SELECT = "usp_scv_Planes_Pagos_ConceptosPago_select";
        private const string USP_SCV_PLANES_PAGOS_CONFIGURACION_SELECT = "usp_scv_Planes_Pagos_Configuracion_select";

        public PlanesPagos(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_PLANES_PAGO_SELECT, null, ENTITY_NAME)
        { }
        public async Task<List<IPlanPagosConceptoPago>> GetConceptosPagoById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                        {
                            { "id", id}
                        };

                List<modelSCV.IPlanPagosConceptoPago> lista = await helper.CreateEntitiesAsync<modelSCV.IPlanPagosConceptoPago>(
                    USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_SELECT, CommandType.StoredProcedure, parameters);
                return lista;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<miSCV.IPlanPagosConceptoPago> GetListConceptosPagoById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };

                return await helper.CreateSingleEntityAsync<miSCV.IPlanPagosConceptoPago>(USP_SCV_PLANES_PAGO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IPlanPagosConfiguracion>> GetListConfiguracionById(Dictionary<string, object> parametros)
        {
            try
            {
                List<modelSCV.IPlanPagosConfiguracion> lista = await helper.CreateEntitiesAsync<modelSCV.IPlanPagosConfiguracion>(
                    USP_SCV_PLANES_PAGOS_CONFIGURACION_SELECT, CommandType.StoredProcedure, parametros);
                return lista;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> GetAllPlanesPagos(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_PLANES_PAGO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using EK.Modelo.SCV.Interfaces;
//using datSCV = EK.Datos.SCV.Interfaces;
//using modelKontrol = EK.Modelo.Kontrol.Interfaces;
//using datKontrol = EK.Datos.Kontrol.Interfaces;
//using modelSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.MSSQL
//{
//    public class PlanesPagos
//        : EK.Datos.Kontrol.DAOBase, datSCV.IPlanesPagos
//    {
//        private const string USP_SCV_PLANES_PAGOS_SELECT = "usp_scv_Planes_Pagos_select";
//        private const string USP_SCV_PLANES_PAGOS_INS_UPD = "usp_scv_Planes_Pagos_ins_upd";
//        private const string USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_SELECT = "usp_scv_Planes_Pagos_ConceptosPago_select";
//        private const string USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_INS_UPD = "usp_scv_Planes_Pagos_ConceptosPago_ins_upd";

//        protected override string EntityName
//        {
//            get
//            {
//                return "scv_planes_venta_ConceptosPago";
//            }
//        }

//        public PlanesPagos(modelKontrol.IContainerFactory factory, datKontrol.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        public async Task<object[]> GetAll(int activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value},
//                    { "activos", activos}
//                };

//                return await helper.CreateEntitiesAsync(
//                    USP_SCV_PLANES_PAGOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<object[]> GetByDesarrollo(int idDesarrollo)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idDesarrollo", idDesarrollo}
//                };

//                return await helper.CreateEntitiesAsync(
//                    USP_SCV_PLANES_PAGOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<IPlanPagos> GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", 0}
//                };
//                return await helper.CreateSingleEntityAsync<modelSCV.IPlanPagos>(
//                    USP_SCV_PLANES_PAGOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<int> Save(IPlanPagos model)
//        {
//            try
//            { 
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("Id", model.PlanPagos.ID);
//                parameters.Add("Clave", model.PlanPagos.Clave);
//                parameters.Add("Descripcion", model.PlanPagos.Descripcion);
//                parameters.Add("VigenciaInicio", model.PlanPagos.VigenciaInicio);
//                parameters.Add("VigenciaFin", model.PlanPagos.VigenciaFin);
//                parameters.Add("IdMoneda", model.PlanPagos.IdMoneda);
//                parameters.Add("IdEstatus", model.IdEstatus);
//                parameters.Add("CreadoPor", model.IdCreadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);
//                return await helper.GetResultAsync(USP_SCV_PLANES_PAGOS_INS_UPD,
//                    CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<List<IPlanPagosConceptoPago>> GetConceptosPagoById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id}
//                };

//                List<modelSCV.IPlanPagosConceptoPago> lista = await helper.CreateEntitiesAsync<modelSCV.IPlanPagosConceptoPago>(
//                    USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_SELECT, CommandType.StoredProcedure, parameters);
//                return lista;
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<int> SaveConceptosPago(int? IdPlanPagos, IPlanPagosConceptoPago model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("Id", model.ID);
//                parameters.Add("IdPlanPagos", IdPlanPagos);
//                parameters.Add("IdConceptoPago", model.ConceptoPago.ID);
//                parameters.Add("IdFrecuenciaPago", model.FrecuenciaPago.ID);
//                parameters.Add("NumeroPagos", model.NumeroPagos);
//                parameters.Add("Importe", model.Importe);
//                parameters.Add("Porcentaje", model.Porcentaje);
//                parameters.Add("PorcentajeTIF", model.PorcentajeTIF);
//                parameters.Add("PorcentajeTIM", model.PorcentajeTIM);
//                parameters.Add("NumeroPlazoPrimerPago", model.NumeroPlazoPrimerPago);
//                parameters.Add("IdPeriodoPrimerPago", model.PeriodoPrimerPago.ID);
//                parameters.Add("Modificable", model.Modificable);
//                parameters.Add("CreadoPor", model.IdModificadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);
//                return await helper.GetResultAsync(USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_INS_UPD,
//                    CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<int> DeleteRelacion(int idRelacion)
//        {
//            return await base.DeleteEntity(idRelacion, "ID", EntityName);
//        }
//    }
//}
