using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_reporte_det")]
    public interface ITicketIncidenciaDetalle : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("folio")]
        int IdReporte { get; set; }

        [m.Kontrol.Column("fraccionamiento")]
        string DesarrolloClave { get; set; }
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }

        [m.Kontrol.Column("partida")]
        int Partida { get; set; }

        [m.Kontrol.Column("tipo_falla")]
        int IdTipoFalla { get; set; }
        m.SCV.Interfaces.ITipoComponente TipoFalla { get; set; }

        [m.Kontrol.Column("falla")]
        int IdFalla { get; set; }
        m.SCV.Interfaces.IComponenteIncidencia Componente { get; set; }

        [m.Kontrol.Column("observaciones")]
        string Observaciones { get; set; }

        [m.Kontrol.Column("estatus_pta")]
        string EstatusPartidaValor { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusPartida { get; set; }

        [m.Kontrol.Column("estatus_autoriza")]
        string EstatusAutorizacion { get; set; }

        [m.Kontrol.Column("aut_partida")]
        string PartidaAutorizada { get; set; }

        [m.Kontrol.Column("responsable")]
        int? IdResponsable { get; set; }
        m.Kontrol.Interfaces.IUsuarioKontrol Responsable { get; set; }

        [m.Kontrol.Column("fecha_terminacion")]
        DateTime? FechaTerminacion { get; set; }

        [m.Kontrol.Column("satisfaccion")]
        string Satisfaccion { get; set; }

        [m.Kontrol.Column("obs_satisfaccion")]
        string ObservacionesSatisfaccion { get; set; }

        [m.Kontrol.Column("termino_garantia")]
        DateTime? TerminoGarantia { get; set; }

        [m.Kontrol.Column("dias_garantia")]
        int? DiasGarantia { get; set; }

        [m.Kontrol.Column("dias_solucion")]
        int? DiasSolucion{ get; set; }


        [m.Kontrol.Column("ubicacion_falla")]
        int? IdUbicacionFalla { get; set; }
        m.SCV.Interfaces.IUbicacionesFalla UbicacionFalla { get; set; }

        [m.Kontrol.Column("observaciones_rechazo")]
        string ObservacionesRechazado { get; set; }

        [m.Kontrol.Column("fecha_cerrado")]
        DateTime? FechaCerrado { get; set; }

        [m.Kontrol.Column("obs_contratista")]
        string ObservacionesContratista { get; set; }

        [m.Kontrol.Column("clave_causa")]
        int? IdCausaFalla { get; set; }
        m.SCV.Interfaces.ICausaIncidencia CausaIncidencia { get; set; }

        [m.Kontrol.Column("obs_causa")]
        string ObservacionesCausaFalla { get; set; }

        [m.Kontrol.Column("fec_revision_prog")]
        DateTime? FechaRevisionProgramacion { get; set; }

        [m.Kontrol.Column("fec_inicio_prog")]
        DateTime? FechaInicioProgramacion { get; set; }

        [m.Kontrol.Column("fec_termino_prog")]
        DateTime? FechaTerminoProgramacion { get; set; }

        [m.Kontrol.Column("fec_revision_real")]
        DateTime? FechaRevisionReal { get; set; }

        [m.Kontrol.Column("fec_inicio_real")]
        DateTime? FechaInicioReal { get; set; }

        [m.Kontrol.Column("porc_avance")]
        decimal? PorcentajeAvance { get; set; }

        [m.Kontrol.Column("procede")]
        string Procede { get; set; }
        bool ProcedeBool { get; set; }

        [m.Kontrol.Column("costo_base")]
        decimal? CostoBase { get; set; }

        [m.Kontrol.Column("motivo_autorizacion")]
        string MotivoAutorizacion { get; set; }

        [m.Kontrol.Column("activo")]
        int? Activo { get; set; }

        [m.Kontrol.Column("IdContratista")]
        int? IdContratista { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }

        int Reincidencias { get; set; }
        int IdCliente { get; set; }
        m.SCV.Interfaces.IClientesSPV Cliente { get; set; }

        List<m.SCV.Interfaces.ITicketDictamen> Dictamenes { get; set; }


    }
}