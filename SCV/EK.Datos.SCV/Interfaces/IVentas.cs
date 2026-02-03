using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IVentas
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IVenta>
    {
        /*Especial para comisiones*/
        Task<m.SCV.Interfaces.IVentaUbicacion> GetUbicacionPorVenta(int idVenta, int idUbicacion);


        Task<List<m.SCV.Interfaces.IVentaUbicacion>> GetUbicacionesById(int idVenta, int? idVentaVersion);
        Task<int> SaveRelacionUbicacion(int? IdDesarrollo, m.SCV.Interfaces.IVentaUbicacion model);
        Task<int> DeleteRelacionUbicacion(m.SCV.Interfaces.IVentaUbicacion model);
        Task<m.SCV.Interfaces.IVentaPP> GetPlanPagos(int idVenta, int idVentaVersion);
        Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPP(int idVenta, int idVentaVersion, string claveEstatus);
        Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPagoById(int IdPlanVenta);
        Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPPNew(int IdPlanPagos);
        Task<int> DeleteRelacionConcepto(int idConcepto, int idVenta);
        Task<List<m.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosPP(int idConcepto, int idVentaVersion);
        Task<List<m.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosPPConcepRecalculo(int idConcepto, int idVentaVersion, int idVenta);
        Task<List<m.SCV.Interfaces.IVentaCaracteristica>> GetCaracteristicasVenta(int IdVenta, int IdVentaUbicacion, int idVentaVersion);
        Task<List<m.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosCancelados(int idVenta, int idConceptopago, int ventaVersion, int idExpediente);
        Task<int> SaveCaracteristicas(int idVenta, int idUbicacion, int? idVentaVersion, m.SCV.Interfaces.IVentaCaracteristica model);
        Task<int> DeleteCaracteristicas(int id);
        Task<int> SavePP(m.SCV.Interfaces.IVentaPP model, int idPlanPago);
        Task<int> SavePPConceptos(m.SCV.Interfaces.IVenta model, int idPlanVenta, m.SCV.Interfaces.IVentaPPConcepto ppConcepto);
        Task<int> SavePPDocumentos(m.SCV.Interfaces.IVenta model, m.Kontrol.Interfaces.IDocumentoPago conceptos, int idConceptoPago, int idVenta, int? idVentaVersion);
        Task<int> DeleteRelacionDocumentos(int idConceptoPago, int idVenta);
        Task<int> UpdateEstatusVenta(int idVenta, string EstatusVenta, m.SCV.Interfaces.IVenta model);
        Task<int> CancelarCaracteristicasVenta(m.SCV.Interfaces.IVentaCaracteristica model);
        Task<List<m.SCV.Interfaces.IReestructuraVenta>> GetReestructuraVenta(int idVenta);
        Task<object[]> GetEstatusVentaAll(int id, int activos);
        Task<int> SaveNuevaVenta(m.SCV.Interfaces.IVenta model);
        Task<m.SCV.Interfaces.IVenta> GetByExpedienteId(int IdExpediente);
        Task<int> SaveVersion(m.SCV.Interfaces.IVentaVersion model);
        Task<m.SCV.Interfaces.IVentaVersion> GetVersion(int? id, int? idVenta, int? ventaVersion, int? idEstatusVersion, bool? actual);
        Task<List<m.SCV.Interfaces.IReestructuraVenta>> GetEdocuenta(int idVenta, int idConceptopago, int estatus, m.SCV.Interfaces.IVentaPPConcepto concepto, int idExpediente);

        Task<List<m.SCV.Interfaces.IExpediente>> GetExpedientesPorTabulador(Dictionary<string, object> parametros);
        #region "FINANCIAMIENTO"
        Task<int> SaveFinanciamiento(m.SCV.Interfaces.IVentaFinanciamiento model, int idVenta, int? idVersionVenta);
        Task<int> DeleteVentaInstitucion(int idRelacion);
        Task<int> DeleteVentaInstitucionConcepto(int idRelacion);
        Task<int> DeleteRelacionFinanciamiento(int id);
        Task<m.SCV.Interfaces.IVentaFinanciamiento> GetVentaFinanciamiento(int idVenta, int idVentaVersion);
        Task<List<m.SCV.Interfaces.IVentaFinanciamientoInstitucion>> GetVentaFinanciamientoInstituciones(int idVenta, int idVentaVersion);
        Task<int> SaveVentaFinanciamientoInstitucion(m.SCV.Interfaces.IVentaFinanciamientoInstitucion item);
        Task<List<m.SCV.Interfaces.IVentaFInstitucionDetalle>> GetVentaInstitucionConceptos(int idVenta, int idVentaFInstitucion, int idVentaVersion);
        Task<int> SaveVentaInstitucionConcepto(m.SCV.Interfaces.IVentaFInstitucionDetalle item);
        #endregion

        #region "VENTA_PROCESOS"
        Task<m.SCV.Interfaces.IVentaProceso> GetVentaProceso(int id);
        Task<m.SCV.Interfaces.IVentaProceso> GetVentaProceso(int idVenta, int idProceso);
        Task<m.SCV.Interfaces.IVentaProceso> GetVentaProceso(int idVenta, string operacion);
        Task<List<m.SCV.Interfaces.IVentaProceso>> GetVentaProcesos(Dictionary<string, object> parametros);
        Task<int> SaveVentaProceso(m.SCV.Interfaces.IVentaProceso model, string operacion);
        Task<m.SCV.Interfaces.IVentaProceso> GetVentaProcesoById(int id);
        #endregion

        #region "VENTA COMISIONES POR METAS"
       Task<List<m.SCV.Interfaces.IComisionesCalculoIndicador>> GetCalculoVentas(Dictionary<string, object> parametros);

       Task<List<m.SCV.Interfaces.IComisionesCalculoIndicadorComplementario>> GetCalculoVentasComplementarias(Dictionary<string, object> parametros);

        #endregion

        /*Filtro Ventas Documentos Por Factura y Importe*/
        Task<object> GetVentasDocumento(Dictionary<string, object> parametros);

    }
}