using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_reporte_fallas_areas_comunes")]
    public interface IReporteFallasAreasComunes
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("folio")]
        int? IdFolio { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("estatus")]
        string IdEstatusReporte { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusReporte { get; set; }

        [m.Kontrol.Column("estatus_rep")]
        string IdEstatusRevisado { get; set; }

        [m.Kontrol.Column("fraccionamiento")]
        string DesarrolloClave { get; set; }
        m.SCV.Interfaces.IFraccionamientos Desarrollo { get; set; }

        [m.Kontrol.Column("cliente")]
        int IdCliente { get; set; }
        m.SCV.Interfaces.IClientesSPV Cliente { get; set; }

        [m.Kontrol.Column("tipoCliente")]
        string UsuarioReporta { get; set; }


        int? IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        [m.Kontrol.Column("calle_a")]
        string CalleA { get; set; }

        [m.Kontrol.Column("calle_b")]
        string CalleB { get; set; }
        
        [m.Kontrol.Column("ubicacion_nombre")]
        string UbicacionNombre { get; set; }

        [m.Kontrol.Column("id_identificador_cc")]
        string IdPlaza { get; set; }

        [m.Kontrol.Column("id_num_tipocasa")]
        int? IdPrototipo { get; set; }

        [m.Kontrol.Column("tipo_cte")]
        string IdTipoCliente { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoCliente { get; set; }
        m.Kontrol.Interfaces.IUsuarioKontrol Usuario { get; set; }

        [m.Kontrol.Column("obs_contratista_reporte")]
        string ObservacionesContratista { get; set; }

        [m.Kontrol.Column("observaciones")]
        string ObservacionesServicio { get; set; }

        [m.Kontrol.Column("dias_cont")]
        int? DiasContratista { get; set; }

        [m.Kontrol.Column("empleado")]
        int? IdRecibidoPor { get; set; }
        m.Kontrol.Interfaces.IUsuarioKontrol RecibidoPor { get; set; }

        [m.Kontrol.Column("fecha")]
        DateTime? Recibido { get; set; }

        [m.Kontrol.Column("fecha_entrega_vivienda")]
        DateTime? FechaEntregaVivienda { get; set; }

        [m.Kontrol.Column("fecha_captura")]
        DateTime? FechaCaptura { get; set; }

        [m.Kontrol.Column("fecha_real_ini")]
        DateTime? FechaContratistaInicial { get; set; }

        [m.Kontrol.Column("fecha_real_complete")]
        DateTime? FechaContratistaFinal { get; set; }

        [m.Kontrol.Column("fecha_envio_mail")]
        DateTime? FechaEnvioCorreo { get; set; }

        [m.Kontrol.Column("fecha_revision")]
        DateTime? FechaRevision { get; set; }

        [m.Kontrol.Column("fecha_entrego")]
        DateTime? FechaEntrego { get; set; }

        [m.Kontrol.Column("fecha_cancelacion")]
        DateTime? FechaCancelacion { get; set; }

        [m.Kontrol.Column("fecha_reprogramacion")]
        DateTime? FechaReprogramacion { get; set; }

        [m.Kontrol.Column("fecha_terminado")]
        DateTime? FechaTerminacionFolio { get; set; }

        [m.Kontrol.Column("tel_casa")]
        string TelefonoCasa { get; set; }

        [m.Kontrol.Column("tel_oficina")]
        string TelefonoOficina { get; set; }

        [m.Kontrol.Column("tel_otros")]
        string TelefonoOtros { get; set; }

        [m.Kontrol.Column("cve_responsable")]
        int? IdResponsable { get; set; }

        [m.Kontrol.Column("id_resp_construc")]
        int? IdResponsableConstruccion { get; set; }
        m.Kontrol.Interfaces.IUsuario ResponsableConstruccion { get; set; }

        [m.Kontrol.Column("observacion_entrego")]
        string ObservacionesEntrego { get; set; }

        [m.Kontrol.Column("entrego")]
        int? IdUsuarioEntrego { get; set; }
        m.Kontrol.Interfaces.IUsuario UsuarioEntrego { get; set; }

        [m.Kontrol.Column("autorizo")]
        int? IdUsuarioAutorizo { get; set; }
        m.Kontrol.Interfaces.IUsuario UsuarioAutorizo { get; set; }

        [m.Kontrol.Column("satisfaccion")]
        string Satisfaccion { get; set; }

        [m.Kontrol.Column("obs_satisfaccion")]
        string ObservacionesSatisfaccion { get; set; }

        [m.Kontrol.Column("reinsidencia")]
        string Reincidencia { get; set; }

        [m.Kontrol.Column("clave_coordinador")]
        int? IdCoordinador { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Coordinador { get; set; }

        [m.Kontrol.Column("clave_supervisor")]
        int? IdSupervisor { get; set; }

        [m.Kontrol.Column("enviado_mail")]
        string EmailEnviado { get; set; }

        [m.Kontrol.Column("usuario_valida_fecha_ini")]
        int? IdUsuarioProcesoInicio { get; set; }
        m.Kontrol.Interfaces.IUsuario UsuarioProcesoInicio { get; set; }

        [m.Kontrol.Column("usuario_valida_fecha_fin")]
        int? IdUsuarioProcesoFin { get; set; }
        m.Kontrol.Interfaces.IUsuario UsuarioProcesoFin { get; set; }

        [m.Kontrol.Column("cancelado")]
        string Cancelado { get; set; }

        [m.Kontrol.Column("motivo_cancelado")]
        int? IdMotivoCancelado { get; set; }

        [m.Kontrol.Column("motivo_no_envio")]
        string MotivoNoEnviado { get; set; }

        [m.Kontrol.Column("cte_profeco")]
        string EsClienteProfeco { get; set; }

        [m.Kontrol.Column("cte_problema")]
        string EsClienteProblema { get; set; }

        [m.Kontrol.Column("cte_perito")]
        string EsClientePerito { get; set; }

        [m.Kontrol.Column("cte_normal")]
        string EsClienteNormal { get; set; }

        [m.Kontrol.Column("tipo_responsable")]
        string TipoResponsable { get; set; }

        [m.Kontrol.Column("costo_base")]
        decimal? CostoBase { get; set; }

        [m.Kontrol.Column("costo_real")]
        decimal? CostoReal { get; set; }

        [m.Kontrol.Column("OC")]
        string OC { get; set; }

        [m.Kontrol.Column("costo_cubierto")]
        string CostoCubierto { get; set; }

        [m.Kontrol.Column("id_causa")]
        int? IdCausa { get; set; }

        [m.Kontrol.Column("bit_reprogramacion")]
        int? EsReprogramacion { get; set; }

        [m.Kontrol.Column("activo")]
        int? Activo { get; set; }

        [m.Kontrol.Column("clave_contratista")]
        int? IdContratista { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }

        [m.Kontrol.Column("id_tipo_contratista")]
        int? IdTipoContratista { get; set; }
        m.SCV.Interfaces.ITipoContratista TipoContratista { get; set; }

        [m.Kontrol.Column("cve_supervisor_contratista")]
        int? IdSupervisorContratista { get; set; }
        m.SCV.Interfaces.IContratista SupervisorContratista { get; set; }

        [m.Kontrol.Column("dictamen")]
        bool Dictamen { get; set; }

        [m.Kontrol.Column("medio")]
        string IdMedio { get; set; }

        [m.Kontrol.Column()]
        int? IdMedioSolicitud { get; set; }

        [m.Kontrol.Column("Plaza", true)]
        new string PlazaView { get; set; }

        m.Kontrol.Interfaces.IItemGeneral MedioSolicitud { get; set; }

        #region "CAMPOS CALCULADOS"
        int MesesTranscurridos { get; set; }
        int? DiasSolucion { get; set; }
        DateTime? FechaSolucionReporte { get; set; }
        DateTime? FechaSolucionTerminacion { get; set; }

        List<m.SCV.Interfaces.IReporteFallasAreasComunesPartida> DictamenesPartidas { get; set; }

        #endregion

        List<m.SCV.Interfaces.IContratistaUbicacion> Contratistas { get; set; }
        List<m.SCV.Interfaces.IClienteContactos> Contactos { get; set; }
        List<m.SCV.Interfaces.IReporteFallasAreasComunesPartida> Partidas { get; set; }
        List<m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes> OrdenesTrabajo { get; set; }
        List<m.SCV.Interfaces.IReporteAreasComunesDictamen> Dictamenes { get; set; }

        int? IdPrereporte { get; set; }
        // m.SCV.Interfaces.IPrereporte Prereporte { get; set; }

        // m.SCV.Interfaces.ISPVEncuestaSatisfaccionFija EncuestaSatisfaccion { get; set; }

        [m.Kontrol.Column("AppCATEnabled", true)]
        bool AppCATEnabled { get; set; }

    }
}