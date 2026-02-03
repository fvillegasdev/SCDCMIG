using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Cotizaciones
         : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IVenta>, d.SCV.Interfaces.ICotizaciones
    {
        private const string USP_SCV_COTIZACIONES_SELECT = "usp_scv_Cotizaciones_select";
        private const string USP_SCV_COTIZACIONES_CARACTERISTICAS_SELECT = "usp_scv_Cotizaciones_Caracteristicas_select";

        //FINANCIAMIENTO
        private const string USP_SCV_COTIZACIONES_FINANCIAMIENTO_SELECT = "usp_scv_Cotizaciones_Financiamiento_select";
        private const string USP_SCV_COTIZACIONES_FINANCIAMIENTO_INS_UPD = "usp_scv_Cotizaciones_Financiamiento_ins_upd";
        private const string USP_SCV_COTIZACIONES_FINANCIAMIENTO_INSTITUCIONES_SELECT = "usp_scv_Cotizaciones_Financiamiento_Instituciones_select";
        private const string USP_SCV_COTIZACIONES_FINANCIAMIENTO_INSTITUCIONES_INS_UPD = "usp_scv_Cotizaciones_Financiamiento_Instituciones_ins_upd";
        private const string USP_SCV_COTIZACIONES_FINANCIAMIENTO_INSTITUCIONESDETALLE_SELECT = "usp_scv_Cotizaciones_Financiamiento_InstitucionesDetalle_select";
        private const string USP_SCV_COTIZACIONES_FINANCIAMIENTO_INSTITUCIONESDETALLE_INS_UPD = "usp_scv_Cotizaciones_Financiamiento_InstitucionesDetalle_ins_upd";

        private const string USP_SCV_COTIZACIONES_PLANESPAGOS_SELECT = "usp_scv_Cotizaciones_PlanesPagos_select";
        private const string USP_SCV_COTIZACIONES_PP_CONCEPTOSPAGO_SELECT = "usp_scv_Cotizaciones_PP_ConceptosPago_select";
        private const string USP_SCV_COTIZACIONES_PP_DOCUMENTOS_SELECT = "usp_scv_Cotizaciones_PP_Documentos_select";
        private const string USP_SCV_COTIZACIONES_UBICACIONES_SELECT = "usp_scv_Cotizaciones_Ubicaciones_select";
        private const string USP_SCV_COTIZACIONES_UBICACIONES_INS_UPD = "usp_scv_Cotizaciones_Ubicaciones_ins_upd";
        private const string USP_SCV_COTIZACIONES_PP_DOCUMENTOS_DELETE = "usp_scv_Cotizaciones_PP_Documentos_delete";
        private const string USP_SCV_COTIZACIONES_CARACTERISTICAS_INS_UPD = "usp_scv_Cotizaciones_Caracteristicas_ins_upd";
        private const string USP_SCV_COTIZACIONES_PLANESPAGOS_INS_UPD = "usp_scv_Cotizaciones_PlanesPagos_ins_upd";
        private const string USP_SCV_COTIZACIONES_PPCONCEPTOSPAGO_INS_UPD = "usp_scv_Cotizaciones_PPConceptosPago_ins_upd";
        private const string USP_SCV_COTIZACIONES_DOCUMENTOSPAGO_INS_UPD = "usp_scv_Cotizaciones_DocumentosPago_ins_upd";
        private const string USP_SCV_COTIZACIONES_INS_UPD = "usp_scv_Cotizaciones_ins_upd";
        private const string USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_SELECT = "usp_scv_Planes_Pagos_ConceptosPago_select";
        /*Ventas Documentos por Factura y Importe*/
        private const string USP_SCV_VENTAS_DOCUMENTOS_SELECT = "usp_scv_ventas_documentos_select";
        public Cotizaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_COTIZACIONES_SELECT,
                  string.Empty,
                  "scv_Cotizaciones")
        { }

        public async Task<object> GetVentasDocumento(Dictionary<string, object> parametros)
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

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IVentaUbicacion>(USP_SCV_COTIZACIONES_PLANESPAGOS_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async override Task<m.SCV.Interfaces.IVenta> Save(m.SCV.Interfaces.IVenta model)
        {
            var retValue = default(m.SCV.Interfaces.IVenta);

            try
            {
                var p = new Dictionary<string, object>();
                p.Add("Id", model.ID);
                p.Add("Clave", model.Clave);
                p.Add("Nombre", model.Nombre);
                p.Add("IdMoneda", model.IdMoneda);
                p.Add("IdAgente", model.IdAgente);
                p.Add("IdPuntoVenta", DBNull.Value);
                p.Add("IdGradoInteres", DBNull.Value);
                p.Add("IdClienteRecomienda", DBNull.Value);
                p.Add("IdEstatusCotizacion", model.IdEstatusVenta);
                p.Add("IdDesarrollo", model.IdDesarrollo);
                p.Add("Importe", model.Importe);
                p.Add("ImporteMoneda", model.ImporteMoneda);
                p.Add("TipoCambio", model.TipoCambio);
                p.Add("FechaVigencia", model.FechaVigencia);
                p.Add("FechaSeleccion", model.FechaSeleccion);
                p.Add("IdExpediente", model.IdExpediente);
                p.Add("IdEstatus", model.IdEstatus);
                p.Add("CreadoPor", model.IdCreadoPor);
                p.Add("ModificadoPor", model.IdModificadoPor);

                var result = await helper.GetResultAsync(USP_SCV_COTIZACIONES_INS_UPD,
                    CommandType.StoredProcedure, p);

                retValue = await this.GetById(result) as m.SCV.Interfaces.IVenta;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVentaPP> GetPlanPagos(int idVenta, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdCotizacion", idVenta }
                };

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IVentaPP>(
                    USP_SCV_COTIZACIONES_PLANESPAGOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPP(int idVenta, int idVentaVersion, string claveEstatus)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdCotizacion", idVenta }
                };

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IVentaPPConcepto>(
                    USP_SCV_COTIZACIONES_PP_CONCEPTOSPAGO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteRelacionConcepto(int idConcepto, int idVenta)
        {
            await this.DeleteRelacionDocumentos(idConcepto, idVenta);
            return await base.DeleteEntity(idConcepto, "ID", "scv_Cotizaciones_PPConceptosPago");
        }

        public async Task<List<m.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosPP(int idConcepto, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdCotizacion", DBNull.Value },
                    { "IdConcepto", idConcepto }
                };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IDocumentoPago>(
                    USP_SCV_COTIZACIONES_PP_DOCUMENTOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosCancelados(int idVenta, int idConceptopago, int ventaVersion, int idExpediente)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdCotizacion", idVenta },
                    { "IdConcepto", idConceptopago },
                    { "Operacion", "CANCELADOS" }
                };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IDocumentoPago>(
                    USP_SCV_COTIZACIONES_PP_DOCUMENTOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IVentaUbicacion>> GetUbicacionesById(int idVenta, int? idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdCotizacion", idVenta }
                };

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IVentaUbicacion>(
                   USP_SCV_COTIZACIONES_UBICACIONES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveRelacionUbicacion(int? IdVenta, m.SCV.Interfaces.IVentaUbicacion model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdCotizacion", IdVenta);
                parameters.Add("IdUbicacion", model.Ubicacion.ID);
                parameters.Add("Importe", model.Importe);
                parameters.Add("ImporteMoneda", model.ImporteMoneda);
                parameters.Add("TipoCambio", model.TipoCambio);
                parameters.Add("IdMoneda", model.IdMoneda);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                parameters.Add("IdListaPreciosVersion", model.IdListaPreciosVersion);
                parameters.Add("IdPaquete", model.Paquete == null ? null : model.Paquete.ID);
                parameters.Add("ValorOperativo", model.ValorOperativo);
                parameters.Add("TotalCaracteristicas", model.TotalCaracteristicas);
                parameters.Add("Diferencia", model.Diferencia);
                parameters.Add("IdPrecioVenta", model.PrecioVenta.ID);
                parameters.Add("Topar", model.Topar);
                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_UBICACIONES_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteRelacionUbicacion(m.SCV.Interfaces.IVentaUbicacion model)
        {
            return await base.DeleteEntity(model.ID.Value, "ID", "scv_Cotizaciones_Ubicaciones");
        }

        public async Task<int> DeleteRelacionDocumentos(int idConceptoPago, int idVenta)
        {
            try
            {
                var parameters = new Dictionary<string, object>()
                {
                    { "IdCotizacion", idVenta },
                    { "IdConceptoPago", idConceptoPago }
                };

                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_PP_DOCUMENTOS_DELETE,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IVentaCaracteristica>> GetCaracteristicasVenta(int IdVenta, int IdVentaUbicacion, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdCotizacion", IdVenta },
                    { "IdEntidad", IdVentaUbicacion }
                };

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IVentaCaracteristica>(
                    USP_SCV_COTIZACIONES_CARACTERISTICAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveCaracteristicas(int idVenta, int idUbicacion, int? idVentaVersion, m.SCV.Interfaces.IVentaCaracteristica model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdCotizacion", idVenta);
                parameters.Add("IdCotizacionUbicacion", model.IdVentaUbicacion);
                parameters.Add("IdEntidad", idUbicacion);
                parameters.Add("IdEntidadCaracteristica", model.IdEntidadCaracteristica);
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
                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_CARACTERISTICAS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteCaracteristicas(int id)
        {
            return await base.DeleteEntity(id, "ID", "scv_Cotizaciones_Caracteristicas");
        }

        public async Task<int> SavePP(m.SCV.Interfaces.IVentaPP model, int idVenta)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdCotizacion", idVenta);
                parameters.Add("IdPlanPago", model.IdPlanVenta);
                parameters.Add("Clave", model.Clave);
                parameters.Add("Descripcion", model.Descripcion);
                parameters.Add("ClaveEstatus", model.Estatus.Clave);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_PLANESPAGOS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SavePPConceptos(m.SCV.Interfaces.IVenta model, int idPlanVenta, m.SCV.Interfaces.IVentaPPConcepto ppConcepto)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", ppConcepto.ID);
                parameters.Add("IdCotizacion", model.ID);
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

                parameters.Add("Orden", ppConcepto.Orden ?? 0);
                parameters.Add("Formula", ppConcepto.Formula);
                parameters.Add("Venta", ppConcepto.Venta);
                parameters.Add("Finiquito", ppConcepto.Finiquito);
                parameters.Add("Reestructura", ppConcepto.Reestructura);

                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_PPCONCEPTOSPAGO_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SavePPDocumentos(m.SCV.Interfaces.IVenta model, m.Kontrol.Interfaces.IDocumentoPago conceptos, int idConceptoPago, int idVenta, int? idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", conceptos.ID);
                parameters.Add("IdCotizacion", idVenta);
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
                parameters.Add("EstatusDocumento ", conceptos.IdEstatusDoc);
                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_DOCUMENTOSPAGO_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateEstatusVenta(int idVenta, string EstatusVenta, m.SCV.Interfaces.IVenta model)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Id", model.ID },
                    { "ClaveEstatusCotizacion", EstatusVenta },
                    { "CreadoPor", model.IdModificadoPor },
                    { "ModificadoPor", model.IdModificadoPor },
                    { "Operacion", "ACTUALIZA_ESTATUS_COTIZACION" }
                };

                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteRelacionFinanciamiento(int id)
        {
            return await base.DeleteEntity(id, "ID", "scv_Cotizaciones_Financiamiento");
        }

        public Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPagoById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id}
                };

                return helper.CreateEntitiesAsync<m.SCV.Interfaces.IVentaPPConcepto>(
                    USP_SCV_PLANES_PAGOS_CONCEPTOSPAGO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IVenta> GetByExpedienteId(int IdExpediente)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdExpediente", IdExpediente}
                };

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IVenta>(
                    USP_SCV_COTIZACIONES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<m.SCV.Interfaces.IVentaFinanciamiento> GetVentaFinanciamiento(int idVenta, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdCotizacion", idVenta },
                };

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IVentaFinanciamiento>(
                    USP_SCV_COTIZACIONES_FINANCIAMIENTO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SaveFinanciamiento(m.SCV.Interfaces.IVentaFinanciamiento model, int idVenta, int? idVersionVenta)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("Clave", model.Financiamiento.Clave);
                parameters.Add("Nombre", model.Financiamiento.Nombre);
                parameters.Add("IdCotizacion", idVenta);
                parameters.Add("IdFinanciamiento", model.Financiamiento.ID);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_FINANCIAMIENTO_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IVentaFinanciamientoInstitucion>> GetVentaFinanciamientoInstituciones(int idVenta, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdCotizacion", idVenta }
                };

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IVentaFinanciamientoInstitucion>(
                    USP_SCV_COTIZACIONES_FINANCIAMIENTO_INSTITUCIONES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SaveVentaFinanciamientoInstituciones(m.SCV.Interfaces.IVenta model, m.SCV.Interfaces.IVentaFinanciamientoInstitucion c, int idVentaFinanciamiento)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", c.ID);
                parameters.Add("IdCotizacion", model.ID);
                parameters.Add("IdCotizacionFinanciamiento", idVentaFinanciamiento);
                parameters.Add("IdInstitucion", c.Institucion.ID);
                parameters.Add("Clave", c.Institucion.Clave);
                parameters.Add("Descripcion", c.Institucion.Nombre);
                parameters.Add("Comentarios", c.Comentarios);
                parameters.Add("MontoCredito", c.MontoCredito);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_FINANCIAMIENTO_INSTITUCIONES_INS_UPD, 
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteVentaInstitucion(int idRelacion)
        {
            return await base.DeleteEntity(idRelacion, "ID", "scv_Cotizaciones_Financiamiento_Instituciones");
        }

        public Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPPNew(int IdPlanPagos)
        {
            throw new NotImplementedException();
        }

        public Task<List<m.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosPPConcepRecalculo(int idConcepto, int idVentaVersion, int idVenta)
        {
            throw new NotImplementedException();
        }

        public async Task<int> CancelarCaracteristicasVenta(m.SCV.Interfaces.IVentaCaracteristica model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("ClaveEstatus", "C");
                parameters.Add("ModificadoPor", model.IdModificadoPor);

                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_CARACTERISTICAS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<List<m.SCV.Interfaces.IReestructuraVenta>> GetReestructuraVenta(int idVenta)
        {
            throw new NotImplementedException();
        }

        public Task<object[]> GetEstatusVentaAll(int id, int activos)
        {
            throw new NotImplementedException();
        }

        public Task<int> SaveNuevaVenta(m.SCV.Interfaces.IVenta model)
        {
            throw new NotImplementedException();
        }

        public Task<int> SaveVersion(m.SCV.Interfaces.IVentaVersion model)
        {
            throw new NotImplementedException();
        }

        public Task<m.SCV.Interfaces.IVentaVersion> GetVersion(int? id, int? idVenta, int? ventaVersion, int? idEstatusVersion, bool? actual)
        {
            throw new NotImplementedException();
        }

        public Task<List<m.SCV.Interfaces.IReestructuraVenta>> GetEdocuenta(int idVenta, int idConceptopago, int estatus, m.SCV.Interfaces.IVentaPPConcepto concepto, int idExpediente)
        {
            throw new NotImplementedException();
        }

        public async Task<int> DeleteVentaInstitucionConcepto(int idRelacion)
        {
            return await base.DeleteEntity(idRelacion, "ID", "scv_Cotizaciones_Financiamiento_InstitucionesDetalle");
        }

        public async Task<int> SaveVentaFinanciamientoInstitucion(m.SCV.Interfaces.IVentaFinanciamientoInstitucion item)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", item.ID);
                parameters.Add("IdCotizacion", item.IdVenta);
                parameters.Add("IdCotizacionFinanciamiento", item.IdVentaFinanciamiento);
                parameters.Add("IdInstitucion", item.Institucion.ID);
                parameters.Add("Clave", item.Institucion.Clave);
                parameters.Add("Descripcion", item.Institucion.Nombre);
                parameters.Add("Comentarios", item.Comentarios);
                parameters.Add("MontoCredito", item.MontoCredito);
                parameters.Add("CreadoPor", item.IdModificadoPor);
                parameters.Add("ModificadoPor", item.IdModificadoPor);

                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_FINANCIAMIENTO_INSTITUCIONES_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IVentaFInstitucionDetalle>> GetVentaInstitucionConceptos(int idVenta, int idVentaFInstitucion, int idVentaVersion)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("idCotizacion", idVenta);
                parameters.Add("idCotizacionFInstitucion", idVentaFInstitucion);

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IVentaFInstitucionDetalle>(
                    USP_SCV_COTIZACIONES_FINANCIAMIENTO_INSTITUCIONESDETALLE_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveVentaInstitucionConcepto(m.SCV.Interfaces.IVentaFInstitucionDetalle item)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("Id", item.ID);
                parameters.Add("Clave", item.Clave);
                parameters.Add("Nombre", item.Nombre);
                parameters.Add("IdCotizacion", item.IdVenta);
                parameters.Add("IdCotizacionFInstitucion", item.IdVentaFInstitucion);
                parameters.Add("IdConcepto", item.IdConcepto);
                parameters.Add("Credito", item.Credito);
                parameters.Add("ValorEstimado", item.ValorEstimado);
                parameters.Add("ValorAutorizado", item.ValorAutorizado);
                parameters.Add("IdEstatus", item.IdEstatus);
                parameters.Add("CreadoPor", item.IdCreadoPor);
                parameters.Add("ModificadoPor", item.IdModificadoPor);

                return await helper.GetResultAsync(USP_SCV_COTIZACIONES_FINANCIAMIENTO_INSTITUCIONESDETALLE_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<m.SCV.Interfaces.IVentaProceso> GetVentaProceso(int id)
        {
            throw new NotImplementedException();
        }

        public Task<m.SCV.Interfaces.IVentaProceso> GetVentaProceso(int idVenta, int idProceso)
        {
            throw new NotImplementedException();
        }

        public Task<m.SCV.Interfaces.IVentaProceso> GetVentaProceso(int idVenta, string operacion)
        {
            throw new NotImplementedException();
        }

        public Task<List<m.SCV.Interfaces.IVentaProceso>> GetVentaProcesos(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public Task<int> SaveVentaProceso(m.SCV.Interfaces.IVentaProceso model, string operacion)
        {
            throw new NotImplementedException();
        }

        public Task<m.SCV.Interfaces.IVentaProceso> GetVentaProcesoById(int id)
        {
            throw new NotImplementedException();
        }
        public Task<List<m.SCV.Interfaces.IExpediente>> GetExpedientesPorTabulador(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        #region "VENTA COMISIONES POR METAS"

        public async Task<List<m.SCV.Interfaces.IComisionesCalculoIndicador>> GetCalculoVentas(Dictionary<string, object> parametros)
        {
            await Task.Run(() => { });

            return null;
        }


        public async Task<List<m.SCV.Interfaces.IComisionesCalculoIndicadorComplementario>> GetCalculoVentasComplementarias(Dictionary<string, object> parametros)
        {
            await Task.Run(() => { });

            return null;
        }
        
        #endregion

    }
}