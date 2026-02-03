using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Ventas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IVenta>, d.SCV.Interfaces.IVentas
    {
        //Venta Estatus/Nueva/Version/Select
        private const string USP_SCV_VENTAS_SELECT = "usp_scv_ventas_select";
        private const string USP_SCV_VENTAS_INS_UPD = "usp_scv_ventas_ins_upd";
        private const string USP_SCV_NUEVA_VENTA_INS_UPD = "usp_scv_Nueva_Venta_ins_upd";
        private const string USP_SCV_ESTATUS_VENTA_SELECT = "usp_scv_estatus_venta_select";
        private const string USP_SCV_VENTAS_VERSION_INS_UPD = "usp_scv_Ventas_Version_ins_upd";
        private const string USP_SCV_VENTAS_VERSION_SELECT = "usp_scv_Ventas_Version_select";
        //Ubicaciones
        private const string USP_SCV_VENTA_UBICACIONES_SELECT = "usp_scv_ventas_ubicaciones_select";
        private const string USP_SCV_VENTA_UBICACIONES_INS_UPD = "usp_scv_ventas_ubicaciones_ins_upd";
        private const string USP_SCV_VENTAS_UBICACIONES_DELETE = "usp_scv_ventas_ubicaciones_delete";

        //FINANCIAMIENTO
        private const string USP_SCV_VENTAS_FINANCIAMIENTO_INS_UPD = "usp_scv_ventas_financiamiento_ins_upd";
        private const string USP_SCV_VENTAS_FINANCIAMIENTO_SELECT = "usp_scv_ventas_financiamiento_select";
        private const string USP_SCV_VENTAS_FINANCIAMIENTO_INSTITUCIONES_SELECT = "usp_scv_ventas_financiamiento_instituciones_select";
        private const string USP_SCV_VENTAS_FINANCIAMIENTO_INSTITUCIONES_INS_UPD = "usp_scv_ventas_financiamiento_instituciones_ins_upd";
        private const string USP_SCV_VENTAS_FINANCIAMIENTO_INSTITUCIONESDETALLE_SELECT = "usp_SCV_Ventas_Financiamiento_InstitucionesDetalle_select";
        private const string USP_SCV_VENTAS_FINANCIAMIENTO_INSTITUCIONESDETALLE_INS_UPD = "usp_scv_Ventas_Financiamiento_InstitucionesDetalle_ins_upd";

        //Caracteristicas
        private const string USP_SCV_VENTAS_CARACTERISTICAS_SELECT = "usp_scv_ventas_caracteristicas_select";
        private const string USP_SCV_VENTAS_CARACTERISTICAS_INS_UPD = "usp_scv_ventas_caracteristicas_ins_upd";
        //Plan de Pagos
        private const string USP_SCV_VENTAS_PP_SELECT = "usp_scv_ventas_pp_select";
        private const string USP_SCV_VENTAS_PP_CONCEPTOS_SELECT = "usp_scv_ventas_pp_conceptos_select";
        private const string USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_SELECT = "usp_scv_Planes_Pagos_ConceptosPago_select";
        private const string USP_SCV_VENTAS_PP_CONCEPTOS_NEW_SELECT = "usp_scv_ventas_pp_conceptos_new_select";
        private const string USP_SCV_VENTAS_PP_EDOCUENTA_SELECT = "usp_scv_Ventas_PP_EdoCuenta_Sel";
        private const string USP_SCV_VENTAS_PP_INS_UPD = "usp_scv_ventas_pp_ins_upd";
        private const string USP_SCV_VENTAS_PP_CONCEPTOS_INS_UPD = "usp_scv_ventas_pp_conceptos_ins_upd";
        //Documentos
        private const string USP_SCV_VENTAS_PP_DOCUMENTOS_SELECT = "usp_scv_ventas_pp_documentos_select";
        private const string USP_SCV_VENTAS_PP_DOCUMENTOS_SELECT_CONCEPRECALCULO = "usp_scv_ventas_pp_documentos_select_ConcepRecalculo";
        private const string USP_SCV_VENTAS_PP_DOCUMENTOS_INS_UPD = "usp_scv_ventas_pp_documentos_ins_upd";
        private const string USP_SCV_VENTAS_PP_DOCUMENTOS_DELETE = "usp_scv_ventas_pp_documentos_delete";
        private const string USP_SCV_VENTAS_PP_DOCUMENTOS_CANCELADOS_SELECT = "usp_scv_ventas_pp_documentos_cancelados_select";
        //Reestructura
        private const string USP_SCV_REESTRUCTURA_VENTA_SELECT = "usp_scv_reestructura_venta_select";
       // private const string USP_SCV_REESTRUCTURA_VENTA_INS_UPD = "usp_scv_reestructura_venta_ins_usp";
        //Procesos de Venta
        private const string USP_SCV_VENTAS_PROCESOS_SELECT = "usp_scv_Ventas_Procesos_select";
        private const string USP_SCV_VENTAS_PROCESOS_INS_UPD = "usp_scv_Ventas_Procesos_ins_upd";


        /*Comisiones por metas*/

        private const string USP_SCV_INDICADORES_CALCULO_VENTAS_SELECT = "usp_scv_Indicadores_Calculo_Ventas_select";

        private const string USP_SCV_INDICADORES_CALCULO_VENTAS_COMPLEMENTARIO_SELECT = "usp_scv_IndicadorCalculoVentas_Complementario_select";

        /*Ventas Documentos por Factura y Importe*/
        private const string USP_SCV_VENTAS_DOCUMENTOS_SELECT = "usp_scv_ventas_documentos_select";
        

        public Ventas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_VENTAS_SELECT,
                  string.Empty,
                  "scv_ventas")
        { }

        public async Task<object> GetVentasDocumento(Dictionary<string,object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_VENTAS_DOCUMENTOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public async Task<m.SCV.Interfaces.IVentaUbicacion> GetUbicacionPorVenta(int idVenta, int idUbicacion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", idVenta },
                    { "idUbicacion", idUbicacion }
                };

                return await helper.CreateSingleEntityAsync<miSCV.IVentaUbicacion>(USP_SCV_VENTA_UBICACIONES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<miSCV.IVentaPP> GetPlanPagos(int idVenta, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", idVenta },
                    { "IdVentaVersion", idVentaVersion }
                };

                return await helper.CreateSingleEntityAsync<miSCV.IVentaPP>(USP_SCV_VENTAS_PP_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IVentaPPConcepto>> GetConceptosPP(int idVenta, int idVentaVersion, string claveEstatus)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", idVenta },
                    { "IdVentaVersion", idVentaVersion},
                    { "ClaveEstatus", claveEstatus}
                };

                return await helper.CreateEntitiesAsync<miSCV.IVentaPPConcepto>(USP_SCV_VENTAS_PP_CONCEPTOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IVentaPPConcepto>> GetConceptosPPNew(int IdPlanPagos)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdPlanPagos ", IdPlanPagos }
                };

                return await helper.CreateEntitiesAsync<miSCV.IVentaPPConcepto>(USP_SCV_VENTAS_PP_CONCEPTOS_NEW_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteRelacionConcepto(int idConcepto, int idVenta)
        {
            await this.DeleteRelacionDocumentos(idConcepto, idVenta);
            return await base.DeleteEntity(idConcepto, "ID", "scv_Ventas_PPConceptosPago");
        }

        public async Task<List<EK.Modelo.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosPP(int idConcepto, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idConcepto", idConcepto },
                    { "ClaveEstatus", "A" },
                    { "IdVentaVersion", idVentaVersion },
                };

                return await helper.CreateEntitiesAsync<EK.Modelo.Kontrol.Interfaces.IDocumentoPago>(
                    USP_SCV_VENTAS_PP_DOCUMENTOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<EK.Modelo.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosPPConcepRecalculo(int idConcepto, int idVentaVersion, int idVenta)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idConcepto", idConcepto },
                    { "ClaveEstatus", "A" },
                    { "IdVentaVersion", idVentaVersion },
                    { "idVenta", idVenta }
                };

                return await helper.CreateEntitiesAsync<EK.Modelo.Kontrol.Interfaces.IDocumentoPago>(
                    USP_SCV_VENTAS_PP_DOCUMENTOS_SELECT_CONCEPRECALCULO, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<EK.Modelo.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosCancelados(int idVenta, int idConceptopago, int ventaVersion, int idExpediente)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idVenta", idVenta },
                    { "idConcepto", idConceptopago },
                    { "ClaveEstatus", "A" },
                    { "IdVentaVersion", ventaVersion },
                };

                return await helper.CreateEntitiesAsync<EK.Modelo.Kontrol.Interfaces.IDocumentoPago>(
                    USP_SCV_VENTAS_PP_DOCUMENTOS_CANCELADOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<miSCV.IVentaUbicacion>> GetUbicacionesById(int idVenta, int? idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", idVenta },
                    { "IdVentaVersion", idVentaVersion }
                };

                List<miSCV.IVentaUbicacion> lista = await helper.CreateEntitiesAsync<miSCV.IVentaUbicacion>(
                   USP_SCV_VENTA_UBICACIONES_SELECT, CommandType.StoredProcedure, parameters);
                return lista;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveRelacionUbicacion(int? IdVenta, miSCV.IVentaUbicacion model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdVenta", IdVenta);
                parameters.Add("IdUbicacion", model.Ubicacion.ID);
                parameters.Add("Importe", model.Importe);
                parameters.Add("ImporteMoneda", model.ImporteMoneda);
                parameters.Add("TipoCambio", model.TipoCambio);
                parameters.Add("IdMoneda", model.IdMoneda);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                parameters.Add("IdVentaVersion", model.IdVentaVersion);
                parameters.Add("IdListaPreciosVersion", model.IdListaPreciosVersion);
                parameters.Add("IdPaquete", model.Paquete == null ? null : model.Paquete.ID);
                parameters.Add("ValorOperativo", model.ValorOperativo);
                parameters.Add("TotalCaracteristicas", model.TotalCaracteristicas);
                parameters.Add("Diferencia", model.Diferencia);
                parameters.Add("IdPrecioVenta", model.PrecioVenta.ID);
                parameters.Add("Topar", model.Topar);
                parameters.Add("ImporteOriginal", model.ImporteOriginal);
                parameters.Add("ImporteOriginalMoneda", model.ImporteOriginalMoneda);

                return await helper.GetResultAsync(USP_SCV_VENTA_UBICACIONES_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteRelacionUbicacion(miSCV.IVentaUbicacion model)
        {
            try
            {

                object result;
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdUbicacion", model.Ubicacion.ID);
                result = await helper.GetResultAsync(USP_SCV_VENTAS_UBICACIONES_DELETE, CommandType.StoredProcedure, parameters);
                return (int)result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteRelacionDocumentos(int idConceptoPago, int idVenta)
        {
            try
            {
                object result;
                var parameters = new Dictionary<string, object>();
                parameters.Add("IdConceptoPago", idConceptoPago);
                parameters.Add("IdVenta", idVenta);
                result = await helper.GetResultAsync(USP_SCV_VENTAS_PP_DOCUMENTOS_DELETE, CommandType.StoredProcedure, parameters);
                return (int)result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IVentaCaracteristica>> GetCaracteristicasVenta(int IdVenta, int IdVentaUbicacion, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdVenta", IdVenta },
                    { "IdEntidad", IdVentaUbicacion},
                    { "IdVentaVersion", idVentaVersion}
                };

                return await helper.CreateEntitiesAsync<miSCV.IVentaCaracteristica>(USP_SCV_VENTAS_CARACTERISTICAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<miSCV.IReestructuraVenta>> GetReestructuraVenta(int idVenta)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idVenta", idVenta }
                };

                return await helper.CreateEntitiesAsync<miSCV.IReestructuraVenta>(USP_SCV_REESTRUCTURA_VENTA_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveCaracteristicas(int idVenta, int idUbicacion, int? idVentaVersion, miSCV.IVentaCaracteristica model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdVenta", idVenta);
                parameters.Add("IdEntidad", idUbicacion);
                parameters.Add("IdEntidadCaracteristica", model.IdEntidadCaracteristica);
                parameters.Add("IdVentaUbicacion", model.IdVentaUbicacion);
                parameters.Add("IdTipoEntidad", model.Caracteristica.IdTipoEntidad);
                parameters.Add("IdCaracteristica", model.IdCaracteristica);
                parameters.Add("Clave", model.Caracteristica.Clave);
                parameters.Add("Nombre", model.Caracteristica.Nombre);
                parameters.Add("Escriturado", model.Caracteristica.Escriturado);
                parameters.Add("IdTipoCaracteristica", model.Caracteristica.IdTipoCaracteristica);
                parameters.Add("VentaOpcional", model.VentaOpcional);
                parameters.Add("Importe", model.Importe);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                parameters.Add("IdVentaVersion", idVentaVersion);
                return await helper.GetResultAsync(USP_SCV_VENTAS_CARACTERISTICAS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteCaracteristicas(int id)
        {
            return await base.DeleteEntity(id, "ID", "scv_Ventas_Caracteristicas");
        }

        public async Task<int> SavePP(miSCV.IVentaPP model, int idVenta)
        {

            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdVenta", idVenta);
                parameters.Add("IdPlanPago", model.IdPlanVenta);
                parameters.Add("Clave", model.Clave);
                parameters.Add("Descripcion", model.Descripcion);
                parameters.Add("ClaveEstatus", model.Estatus.Clave);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                parameters.Add("IdVentaVersion", model.IdVentaVersion);
                return await helper.GetResultAsync(USP_SCV_VENTAS_PP_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SavePPConceptos(miSCV.IVenta model, int idPlanVenta, m.SCV.Interfaces.IVentaPPConcepto ppConcepto)
        {
            miSCV.IVentaPPConcepto VentaConceptos = this.factory.GetInstance<miSCV.IVentaPPConcepto>();

            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", ppConcepto.ID);
                parameters.Add("IdVenta", model.ID);
                parameters.Add("IdPlanVenta", idPlanVenta);
                parameters.Add("IdConceptoPago", ppConcepto.ConceptoPago.ID);
                parameters.Add("Clave", ppConcepto.ConceptoPago.Clave);
                parameters.Add("Nombre", ppConcepto.ConceptoPago.Nombre);
                parameters.Add("IdFrecuenciaPago", ppConcepto.FrecuenciaPago.ID);
                parameters.Add("NumeroPagos", ppConcepto.NumeroPagos);
                parameters.Add("Importe", ppConcepto.Importe ?? 0);
                parameters.Add("ImporteMoneda", ppConcepto.Importe ?? 0);
                parameters.Add("Capital", ppConcepto.Capital ?? 0);
                parameters.Add("CapitalMoneda", ppConcepto.CapitalMoneda ?? 0);
                parameters.Add("Interes", ppConcepto.Interes ?? 0);
                parameters.Add("InteresMoneda", ppConcepto.InteresMoneda ?? 0);
                parameters.Add("TipoCambio", ppConcepto.TipoCambio ?? Convert.ToInt32(1));
                parameters.Add("IdMoneda", ppConcepto.IdMoneda ?? 0);
                parameters.Add("Modificable", ppConcepto.Modificable);
                parameters.Add("NumeroPlazoPrimerPago", ppConcepto.NumeroPlazoPrimerPago);
                parameters.Add("IdPeriodoPrimerPago", ppConcepto.PeriodoPrimerPago.ID);
                parameters.Add("Porcentaje", ppConcepto.Porcentaje ?? 0);
                parameters.Add("PorcentajeTIF", ppConcepto.PorcentajeTIF ?? 0);
                parameters.Add("PorcentajeTIM", ppConcepto.PorcentajeTIM ?? 0);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                parameters.Add("ClaveEstatus", model.Estatus.Clave);
                parameters.Add("Pagado", ppConcepto.Pagado ?? 0);
                parameters.Add("IdVentaVersion", ppConcepto.IdVentaVersion);


                parameters.Add("Orden", ppConcepto.Orden ?? 0);
                parameters.Add("Formula", ppConcepto.Formula);
                parameters.Add("Venta", ppConcepto.Venta);
                parameters.Add("Finiquito", ppConcepto.Finiquito);
                parameters.Add("Reestructura", ppConcepto.Reestructura);

                return await helper.GetResultAsync(USP_SCV_VENTAS_PP_CONCEPTOS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SavePPDocumentos(miSCV.IVenta model, m.Kontrol.Interfaces.IDocumentoPago conceptos, int idConceptoPago, int idVenta, int? idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", conceptos.ID);
                parameters.Add("IdVenta", idVenta);
                parameters.Add("IdConceptoPago", idConceptoPago);
                parameters.Add("Numero", conceptos.Numero);
                parameters.Add("Capital", conceptos.Capital);
                parameters.Add("CapitalMoneda", conceptos.CapitalMoneda);
                parameters.Add("Interes", conceptos.Interes);
                parameters.Add("InteresMoneda", conceptos.InteresMoneda);
                parameters.Add("Importe", conceptos.Importe);
                parameters.Add("ImporteMoneda", conceptos.ImporteMoneda);
                parameters.Add("TipoCambio", conceptos.TipoCambio ?? 0);
                parameters.Add("IdMoneda", conceptos.IdMoneda);
                parameters.Add("Vencimiento", conceptos.Vencimiento);
                parameters.Add("CreadoPor", conceptos.IdModificadoPor);
                parameters.Add("ModificadoPor", conceptos.IdModificadoPor);
                parameters.Add("IdTipoAbono", conceptos.TipoAbono.ID);
                parameters.Add("IdEstatus", conceptos.IdEstatus);
                parameters.Add("ClaveEstatus", "A");
                parameters.Add("Pagado", conceptos.Pagado ?? 0);
                parameters.Add("IdVentaVersion", idVentaVersion);
                parameters.Add("IdEstatusDoc ", conceptos.IdEstatusDoc);
                return await helper.GetResultAsync(USP_SCV_VENTAS_PP_DOCUMENTOS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateEstatusVenta(int idVenta, string EstatusVenta, miSCV.IVenta model)
        {
            try
            {
                var parameters = new Dictionary<string, object>{
                    { "ID", model.ID },
                    { "ClaveEstatusVenta", EstatusVenta},
                    { "ModificadoPor", model.IdModificadoPor},
                    { "ActualizaEstatus", true}
                };

                return await helper.GetResultAsync(USP_SCV_VENTAS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteRelacionFinanciamiento(int id)
        {
            return await base.DeleteEntity(id, "ID", "scv_Ventas_Financiamiento");
        }

        public async Task<miSCV.IVentaFinanciamiento> GetVentaFinanciamiento(int idVenta, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", idVenta },
                    { "IdVentaVersion", idVentaVersion}
                };

                return await helper.CreateSingleEntityAsync<miSCV.IVentaFinanciamiento>(USP_SCV_VENTAS_FINANCIAMIENTO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> CancelarCaracteristicasVenta(miSCV.IVentaCaracteristica model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("ClaveEstatus", "C");
                parameters.Add("ModificadoPor", model.IdModificadoPor);

                return await helper.GetResultAsync(USP_SCV_VENTAS_CARACTERISTICAS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<object[]> GetEstatusVentaAll(int id, int activos)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    {"id",DBNull.Value },
                    {"activos",activos }
                };
                var result = await helper.CreateEntitiesAsync(USP_SCV_ESTATUS_VENTA_SELECT, CommandType.StoredProcedure, parameters);
                return result;
            }
            catch
            {
                throw;
            }
        }

        //Genera NuevaVenta con Expediente.
        public async Task<int> SaveNuevaVenta(miSCV.IVenta model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                //parameters.Add("IdTipoCliente", model.IdTipoCliente);
                parameters.Add("IdExpediente", model.IdExpediente);
                parameters.Add("IdDesarrollo", model.IdDesarrollo);
                parameters.Add("IdAgente", model.IdAgente);
                parameters.Add("CreadoPor", model.IdCreadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                parameters.Add("IdEstatusVenta", model.IdEstatusVenta);
                parameters.Add("IdEstatus", model.IdEstatus);

                return await helper.GetResultAsync(USP_SCV_NUEVA_VENTA_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPagoById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id}
                };

                List<miSCV.IVentaPPConcepto> lista = await helper.CreateEntitiesAsync<miSCV.IVentaPPConcepto>(
                    USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_SELECT, CommandType.StoredProcedure, parameters);
                return lista;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveVersion(miSCV.IVentaVersion model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdVenta", model.IdVenta);
                parameters.Add("VentaVersion", model.VentaVersion);
                parameters.Add("FechaInicio", model.FechaInicio);
                parameters.Add("FechaFinal", model.FechaFinal);
                parameters.Add("IdEstatusVersion", model.IdEstatusVersion);
                parameters.Add("Actual", model.Actual);
                parameters.Add("IdEstatus", model.IdEstatus);
                parameters.Add("CreadoPor", model.IdCreadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);

                return await helper.GetResultAsync(
                       USP_SCV_VENTAS_VERSION_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<miSCV.IVentaVersion> GetVersion(int? id, int? idVenta, int? ventaVersion, int? idEstatusVersion, bool? actual)
        {
            try
            {
                var parametros = new Dictionary<string, object>()
                {
                    { "Id", id },
                    { "IdVenta", idVenta},
                    { "VentaVersion", ventaVersion},
                    { "IdEstatusVersion", idEstatusVersion},
                    { "Actual", actual},
                    { "activos", 1 }
                };

                return await helper.CreateSingleEntityAsync<miSCV.IVentaVersion>(
                    USP_SCV_VENTAS_VERSION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<miSCV.IVenta> GetByExpedienteId(int IdExpediente)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdExpediente", IdExpediente}
                };

                return await helper.CreateSingleEntityAsync<miSCV.IVenta>(
                    USP_SCV_VENTAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<miSCV.IReestructuraVenta>> GetEdocuenta(int idVenta, int idConceptopago, int estatus, m.SCV.Interfaces.IVentaPPConcepto concepto, int idExpediente)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("idVenta", idVenta);
                parameters.Add("idConceptoPago", idConceptopago);
                parameters.Add("NumPagos ", concepto.NumeroPagos ?? 0);
                parameters.Add("Plazo ", concepto.NumeroPlazoPrimerPago ?? 0);
                parameters.Add("FrecuenciaPago", concepto.FrecuenciaPago.ID);
                parameters.Add("PeriodoPrimerPago", concepto.PeriodoPrimerPago.ID);
                parameters.Add("Interes", concepto.PorcentajeTIF ?? 0);
                parameters.Add("estatus", estatus);

                List<miSCV.IReestructuraVenta> lista = await helper.CreateEntitiesAsync<miSCV.IReestructuraVenta>(
                   USP_SCV_VENTAS_PP_EDOCUENTA_SELECT, CommandType.StoredProcedure, parameters);
                return lista;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveFinanciamiento(miSCV.IVentaFinanciamiento model, int idVenta, int? idVersionVenta)
        {

            miSCV.IVenta VentaFinanciamiento = this.factory.GetInstance<miSCV.IVenta>();

            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdVenta", idVenta);
                parameters.Add("IdFinanciamiento", model.Financiamiento.ID);
                parameters.Add("Clave", model.Financiamiento.Clave);
                parameters.Add("Nombre", model.Financiamiento.Nombre);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                parameters.Add("IdVentaVersion", idVersionVenta);
                return await helper.GetResultAsync(USP_SCV_VENTAS_FINANCIAMIENTO_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IVentaFinanciamientoInstitucion>> GetVentaFinanciamientoInstituciones(int idVenta, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idVenta", idVenta },
                    { "IdVentaVersion", idVentaVersion},
                };

                return await helper.CreateEntitiesAsync<miSCV.IVentaFinanciamientoInstitucion>(
                    USP_SCV_VENTAS_FINANCIAMIENTO_INSTITUCIONES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SaveVentaFinanciamientoInstitucion(miSCV.IVentaFinanciamientoInstitucion item)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", item.ID);
                parameters.Add("IdVenta", item.IdVenta);
                parameters.Add("IdVentaFinanciamiento", item.IdVentaFinanciamiento);
                parameters.Add("IdInstitucion", item.Institucion.ID);
                parameters.Add("Clave", item.Institucion.Clave);
                parameters.Add("Descripcion", item.Institucion.Nombre);
                parameters.Add("Comentarios", item.Comentarios);
                parameters.Add("MontoCredito", item.MontoCredito);
                parameters.Add("CreadoPor", item.IdModificadoPor);
                parameters.Add("ModificadoPor", item.IdModificadoPor);
                parameters.Add("IdVentaVersion", item.IdVentaVersion);

                return await helper.GetResultAsync(USP_SCV_VENTAS_FINANCIAMIENTO_INSTITUCIONES_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<miSCV.IVentaFInstitucionDetalle>> GetVentaInstitucionConceptos(int idVenta, int idVentaFInstitucion, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("idVenta", idVenta);
                parameters.Add("idVentaFInstitucion", idVentaFInstitucion);
                parameters.Add("idVentaVersion", idVentaVersion);

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IVentaFInstitucionDetalle>(
                    USP_SCV_VENTAS_FINANCIAMIENTO_INSTITUCIONESDETALLE_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveVentaInstitucionConcepto(miSCV.IVentaFInstitucionDetalle item)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", item.ID);
                parameters.Add("Clave", item.Clave);
                parameters.Add("Nombre", item.Nombre);
                parameters.Add("IdVenta", item.IdVenta);
                parameters.Add("IdVentaFInstitucion", item.IdVentaFInstitucion);
                parameters.Add("IdConcepto", item.IdConcepto);
                parameters.Add("Credito", item.Credito);
                parameters.Add("ValorEstimado", item.ValorEstimado);
                parameters.Add("ValorAutorizado", item.ValorAutorizado);
                parameters.Add("IdEstatus", item.IdEstatus);
                parameters.Add("CreadoPor", item.IdCreadoPor);
                parameters.Add("ModificadoPor", item.IdModificadoPor);
                parameters.Add("IdVentaVersion", item.IdVentaVersion);

                return await helper.GetResultAsync(USP_SCV_VENTAS_FINANCIAMIENTO_INSTITUCIONESDETALLE_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteVentaInstitucion(int idRelacion)
        {
            return await base.DeleteEntity(idRelacion, "ID", "scv_Ventas_Financiamiento_Instituciones");
        }

        public async Task<int> DeleteVentaInstitucionConcepto(int idRelacion)
        {
            return await base.DeleteEntity(idRelacion, "ID", "scv_Ventas_Financiamiento_InstitucionesDetalle");
        }

        #region "VENTA_PROCESOS"

        /*{obtener proceso de la venta por id}*/
        public async Task<miSCV.IVentaProceso> GetVentaProceso(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object> { { "Id", id } };
                return await helper.CreateSingleEntityAsync<miSCV.IVentaProceso>(
                    USP_SCV_VENTAS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /*{obtener proceso de la venta por el id de la venta y el proceso}*/
        public async Task<miSCV.IVentaProceso> GetVentaProceso(int idVenta, int idProceso)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idVenta", idVenta },
                    { "idVentaProceso", idProceso }
                };

                return await helper.CreateSingleEntityAsync<miSCV.IVentaProceso>(
                    USP_SCV_VENTAS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /*{obtener proceso de la venta por el id de la venta y el proceso}*/
        public async Task<miSCV.IVentaProceso> GetVentaProceso(int idVenta, string operacion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idVenta", idVenta },
                    { "Operacion", operacion }
                };

                return await helper.CreateSingleEntityAsync<miSCV.IVentaProceso>(
                    USP_SCV_VENTAS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /*{obtener proceso de la venta por parámetros*/
        public async Task<List<miSCV.IVentaProceso>> GetVentaProcesos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<miSCV.IVentaProceso>(
                   USP_SCV_VENTAS_PROCESOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveVentaProceso(miSCV.IVentaProceso model, string operacion)
        {
            try
            {
                var p = new Dictionary<string, object>();
                p.Add("Id", model.ID);
                p.Add("IdVenta", model.IdVenta);
                p.Add("IdVentaProceso", model.IdVentaProceso);
                p.Add("FechaInicio", model.FechaInicio);
                p.Add("FechaFin", model.FechaFin);
                p.Add("IdEstatusProceso", model.IdEstatusProceso);
                p.Add("IdEstatus", model.IdEstatus);
                p.Add("CreadoPor", model.IdCreadoPor);
                p.Add("ModificadoPor", model.IdModificadoPor);
                p.Add("Operacion", operacion);

                return await helper.GetResultAsync(
                    USP_SCV_VENTAS_PROCESOS_INS_UPD, CommandType.StoredProcedure, p);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<miSCV.IVentaProceso> GetVentaProcesoById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Id", id }
                };

                return await helper.CreateSingleEntityAsync<miSCV.IVentaProceso>(
                   USP_SCV_VENTAS_PROCESOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion


        #region "VENTA COMISIONES POR METAS"

        public async Task<List<m.SCV.Interfaces.IComisionesCalculoIndicador>> GetCalculoVentas(Dictionary<string,object> parametros)
        {
            return await helper.CreateEntitiesAsync<miSCV.IComisionesCalculoIndicador>(
                    USP_SCV_INDICADORES_CALCULO_VENTAS_SELECT, CommandType.StoredProcedure, parametros);
        }

        public async Task<List<m.SCV.Interfaces.IExpediente>> GetExpedientesPorTabulador(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync<miSCV.IExpediente>(
                    USP_SCV_INDICADORES_CALCULO_VENTAS_SELECT, CommandType.StoredProcedure, parametros);
        }

        public async Task<List<m.SCV.Interfaces.IComisionesCalculoIndicadorComplementario>> GetCalculoVentasComplementarias(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync<miSCV.IComisionesCalculoIndicadorComplementario>(
                    USP_SCV_INDICADORES_CALCULO_VENTAS_COMPLEMENTARIO_SELECT, CommandType.StoredProcedure, parametros);
        }

        #endregion
    }
}