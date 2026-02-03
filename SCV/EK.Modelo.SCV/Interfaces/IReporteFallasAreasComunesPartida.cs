using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_reporte_fallas_areas_comunes_partidas")]
    public interface IReporteFallasAreasComunesPartida : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Folio")]
        int? IdReporte { get; set; }
        [m.Kontrol.Column("Partida")]
        int? Partida { get; set; }
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        [m.Kontrol.Column("Tipo_Falla")]
        int? IdTipoFalla { get; set; }
        m.SCV.Interfaces.ITipoFallaAreaComun TipoFalla { get; set; }
        [m.Kontrol.Column("Falla")]
        int? IdFalla { get; set; }
        m.SCV.Interfaces.IFallaAreaComun Falla { get; set; }
        [m.Kontrol.Column("Fraccionamiento")]
        string DesarrolloClave { get; set; }
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }
        [m.Kontrol.Column("Observaciones")]
        string Observaciones { get; set; }
        [m.Kontrol.Column("Estatus_pta")]
        string EstatusPartidaValor { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusPartida { get; set; }
        [m.Kontrol.Column("Fecha_termino_garantia")]
        DateTime? FechaTerminoGarantia { get; set; }
        [m.Kontrol.Column("Dias_garantia")]
        int? DiasGarantia { get; set; }
        [m.Kontrol.Column("Aut_partida")]
        string PartidaAutorizada { get; set; }
        [m.Kontrol.Column("Id_ubicacion_falla")]
        int? IdUbicacionFalla { get; set; }
        m.SCV.Interfaces.IUbicacionComun UbicacionFalla { get; set; }
        [m.Kontrol.Column("Fecha_cerrado")]
        DateTime? FechaCerrado { get; set; }
        [m.Kontrol.Column("Fecha_revision_prog")]
        DateTime? FechaRevisionProgramacion { get; set; }

        [m.Kontrol.Column("Fecha_inicio_prog")]
        DateTime? FechaInicioProgramacion { get; set; }

        [m.Kontrol.Column("Fecha_termino_prog")]
        DateTime? FechaTerminoProgramacion { get; set; }

        [m.Kontrol.Column("Fecha_revision_real")]
        DateTime? FechaRevisionReal { get; set; }

        [m.Kontrol.Column("Fecha_inicio_real")]
        DateTime? FechaInicioReal { get; set; }
        [m.Kontrol.Column("Estatus_autoriza")]
        string EstatusAutorizacion { get; set; }
        [m.Kontrol.Column("Id_causa")]
        int? IdCausaFalla { get; set; }
        m.SCV.Interfaces.ICausaFallaAreaComun CausaFalla { get; set; }

        [m.Kontrol.Column("Responsable")]
        int? IdResponsable { get; set; }
        m.Kontrol.Interfaces.IUsuarioKontrol Responsable { get; set; }
        [m.Kontrol.Column("Fecha_terminacion")]
        DateTime? FechaTerminacion { get; set; }
        [m.Kontrol.Column("Observaciones_rechazo")]
        string ObservacionesRechazado { get; set; }
        [m.Kontrol.Column("Obs_contratista")]
        string ObservacionesContratista { get; set; }
        [m.Kontrol.Column("Procede")]
        string Procede { get; set; }
        [m.Kontrol.Column("Id_contratista")]
        int? IdContratista { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }
        [m.Kontrol.Column("Activo")]
        int? Activo { get; set; }
        [m.Kontrol.Column("IdEstatusDictamen")]
        int IdEstatusDictamen { get; set; }
        [m.Kontrol.Column("EstatusDictamen")]
        string EstatusDictamen { get; set; }
        [m.Kontrol.Column("Satisfaccion")]
        string Satisfaccion { get; set; }
        [m.Kontrol.Column("Obs_satisfaccion")]
        string ObservacionesSatisfaccion { get; set; }
        [m.Kontrol.Column("Termino_garantia")]
        DateTime? TerminoGarantia { get; set; }
        [m.Kontrol.Column("Porc_avance")]
        decimal? PorcentajeAvance { get; set; }
        [m.Kontrol.Column("Motivo_autorizacion")]
        string MotivoAutorizacion { get; set; }
        int IdCliente { get; set; }
        m.SCV.Interfaces.IClientesSPV Cliente { get; set; }

        List<m.SCV.Interfaces.IReporteAreasComunesDictamen> Dictamenes { get; set; }
    }
}