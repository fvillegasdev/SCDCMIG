using System.Threading.Tasks;
using System.Collections.Generic;
using miSCV = EK.Modelo.SCV.Interfaces;
using mKontrol = EK.Modelo.Kontrol;

using m = EK.Modelo;
using p = EK.Procesos;
using d = EK.Datos;

namespace EK.Procesos.SCV.Interfaces
{
    [mKontrol.KontrolName("ventas")]
    public interface IVentas
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IVenta>
    {
        Task<miSCV.IVenta> GetVentaByExpedienteId(int IdExpediente);
        Task<miSCV.IVenta> GetByExpedienteId(int IdExpediente);
        Task<miSCV.IVentaPP> CalcularPlanPagos(int idVenta, int idPlanPagos, int idExpediente, m.SCV.Interfaces.IVentaFinanciamiento financiamiento, List<m.SCV.Interfaces.IVentaUbicacion> ubicaciones);
        Task<miSCV.IVentaPP> RecalcularPlanPagos(miSCV.IVenta venta, miSCV.IVentaPPConcepto concepto);
        Task<miSCV.IVentaPP> AgregarAbonoCapital(miSCV.IVenta venta, miSCV.IVentaPPConcepto concepto, mKontrol.Interfaces.IAbono abono);
        Task<List<miSCV.IVentaUbicacion>> GetUbicacionesById(int idVenta);
        Task<List<miSCV.IVentaUbicacion>> GetUbicacionesById(int idVenta, int idVentaVersion, int? idExpediente);
        Task<List<m.SCV.Interfaces.IVentaUbicacion>> GetUbicacionesCotizacionById(int idVenta);
        #region FINANCIAMIENTO
        Task<List<m.SCV.Interfaces.ITipoFinanciamientoInstitucion>> GetTFInstituciones(Dictionary<string, object> parametros);
        Task<miSCV.IVentaUbicacion> VentaUbicacion(miSCV.IVentaUbicacion ventaUbicacion, miSCV.IVentaFinanciamiento ventaFinanciamiento, int idVenta, int idExpediente, bool allowSave);
        Task<object[]> RecalcularUbicaciones(int idVenta, List<miSCV.IVentaUbicacion> ubicaciones, int idFinanciamiento, int idExpediente);
        Task<List<mKontrol.Interfaces.IKontrolFile>> GetArchivosUbicacion(miSCV.IVentaUbicacion ubicacion);
        Task<List<m.SCV.Interfaces.IReestructuraVenta>> GetEdocuenta(int idVenta, int idConceptoPago, int estatus, m.SCV.Interfaces.IVentaPPConcepto concepto, int idExpediente);
        Task<miSCV.IVentaPP> GetPlanDeVenta(int id, int idVentaVersion, int? idExpediente);
        Task<miSCV.IVentaFinanciamiento> GetVentaFinanciamiento(int idVenta, int idVentaVersion, int? idExpediente);
        //Task<miSCV.IVentaFinanciamiento> GetVentaFinanciamiento(int idVenta);
        Task<miSCV.IVenta> SaveFinanciamiento(m.SCV.Interfaces.IVenta venta, int idVenta, int idVersionventa);
        //Task<List<miSCV.IVentaFinanciamientoInstitucion>> GetFinanciamientoInstituciones(Dictionary<string, object> parametros);
        Task<List<miSCV.IVentaFInstitucionDetalle>> GetInstitucionConceptos(Dictionary<string, object> parametros);
        #endregion

        Task<List<miSCV.IVentaCaracteristica>> GetCaracteristicasVenta(int idVenta, int IdVentaUbicacion, int idVentaVersion, int? idExpediente);
        Task<miSCV.IVentaCaracteristica> GetEntidadCaracteristica(miSCV.IVentaCaracteristica item);
        Task<miSCV.IVenta> UpdateEstatusVenta(int idVenta, string claveEstatus);
        Task<miSCV.IVenta> SaveNuevaVenta(int? idExpediente, int? idDesarrollo, int? idAgente);
        Task<miSCV.IVenta> SaveVenta(miSCV.IVenta item);

       Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPago(int idExpediente);

        #region FINIQUITO
        Task<object> IsAllowedToFiniquito(int idExpediente);
        Task<m.SCV.Interfaces.IVenta> StartFiniquito(int idVenta, int idExpediente);
        #endregion

        #region VERSION_VENTA
        Task<miSCV.IVentaVersion> GetCurrentVersion(int idVenta);
        Task<miSCV.IVentaVersion> GetSpecificVersion(int? id, int? idVenta, int? versionVenta, string estatus, bool? actual);
        Task<miSCV.IVentaVersion> IncrementVersion(int idVenta);
        Task<miSCV.IVentaVersion> UpdateVersion(int idVenta, string claveEstatus);
        Task<miSCV.IVentaVersion> SaveVersion(miSCV.IVentaVersion model);
        #endregion

        #region AUTHORIZE_VENTA
        Task<bool> IsAllowedToEdit(int id);
        Task<object> IsAllowedToAuthorize(int idExpediente);
        Task<miSCV.IVenta> RequestAuthorize(int idVenta, int idExpediente);
        Task<object> IsAllowedToReestructura(int idExpediente);
        Task<miSCV.IVenta> StartReestructura(int idVenta, int idExpediente);
        #endregion

        #region VENTA_PROCESOS
        Task<miSCV.IVenta> CreateProcesos(int idVenta);
        Task<miSCV.IVentaProceso> SaveVentaProceso(int idVenta, string claveProceso, string operacion);
        Task<miSCV.IVentaProceso> GetProcesoActivo(int idVenta);
        #endregion

        #region COTIZACIONES
        Task<d.SCV.Interfaces.IVentas> GetDAO(int? idExpediente);
        Task<miSCV.IVenta> GetCotizacionById(int id);
        Task<miSCV.IVenta> SaveCotizacion(miSCV.IVenta item);
        Task<List<miSCV.IVenta>> GetCotizaciones(int idExpediente);
        Task<List<miSCV.IVenta>> RecalcularCotizaciones(miSCV.IVenta item);
        Task<miSCV.IVenta> SetCotizacion(miSCV.IVenta cotizacion, int idExpediente, List<miSCV.IVenta> cotizaciones);
        Task<miSCV.IVenta> GetCurrentCotizacion(int idCotizacion, int idExpediente);
        Task<miSCV.IVenta> SeleccionarCotizacion(int idCotizacion, int idExpediente);
        Task<m.SCV.Interfaces.IVenta> GetCotizacionSeleccionada(int idExpediente);
        Task<string> ImprimirCotizacion(int id, int idExpediente);
        Task<bool> IsAllowedToCotizar(int idExpediente);
        Task<object> IsAllowedToSelectCotizacion(int idExpediente);
        #endregion
    }
}