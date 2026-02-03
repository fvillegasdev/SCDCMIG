using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_ordenes_trabajo")]
    public interface IOrdenTrabajoRUBA
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("IdReporte")]
        int IdReporte { get; set; }

        [m.Kontrol.Column("IdContratista")]
        int IdContratista { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }

        [m.Kontrol.Column("Autorizada")]
        bool? Autorizada { get; set; }

        [m.Kontrol.Column("Observaciones")]
        string Observaciones { get; set; }

        [m.Kontrol.Column("IdEstatusOrdenTrabajo")]
        int? IdEstatusOrdenTrabajo { get; set; }

        [m.Kontrol.Column("DiasEstimadoCulminacion")]
        int? DiasEstimadoCulminacion { get; set; }

        [m.Kontrol.Column("FechaInicio")]
        DateTime? FechaInicio { get; set; }

        [m.Kontrol.Column("FechaFin")]
        DateTime? FechaFin { get; set; }

        [m.Kontrol.Column("FechaInicioReal")]
        DateTime? FechaInicioReal { get; set; }

        [m.Kontrol.Column("FechaFinReal")]
        DateTime? FechaFinReal { get; set; }

        [m.Kontrol.Column("IdAgenda")]
        int? IdAgenda { get; set; }

        [m.Kontrol.Column("IdResponsableDictamen")]
        int? IdCat { get; set; }

        string NombreCatResponsable { get; set; }

        bool? CerrarRegistro { get; set; }

        m.Kontrol.Interfaces.IAgenda Agenda { get; set; }

        m.Kontrol.Interfaces.IAgendaEntVivienda AgendaDetalle { get; set; }

        m.Kontrol.Interfaces.IItemGeneral EstatusOrdenTrabajo { get; set; }

        List<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBA> Partidas { get; set; }

        //CAT
        [m.Kontrol.Column("Firma", true)]
        string Firma { get; set; }
        [m.Kontrol.Column("IdAtiende", true)]
        EK.Modelo.Kontrol.Interfaces.IBaseUsuario Atiende { get; set; }
        int IdAtiende { get; set; }
        [m.Kontrol.Column("IdSupervisorContratista", true)]
        int IdSupervisorContratista { get; set; }
        EK.Modelo.Kontrol.Interfaces.IBaseUsuario SupervisorContratista { get; set; }

        [m.Kontrol.Column("VistoBueno", true)]
        bool VistoBueno { get; set; }

        [m.Kontrol.Column("procedeDictamen", true)]
        bool procedeDictamen { get; set; }

        [m.Kontrol.Column("FechaInicioConst", true)]
        DateTime FechaInicioConst { get; set; }

        [m.Kontrol.Column("FechaFinConst", true)]
        DateTime FechaFinConst { get; set; }
        [m.Kontrol.Column("FirmaContratista", true)]
        bool FirmaContratista { get; set; }

        [m.Kontrol.Column("FirmaAtiende", true)]
        bool FirmaAtiende { get; set; }
        bool seleccionAbrir { get; set; }

        [m.Kontrol.Column("comentarios_generales", true)]
        string ComentarioGeneralOT { get; set; }

        string FirmaClienteFilename { get; set; }
        string FirmaCatSupFilename { get; set; }
        string FirmaContratistaFilename { get; set; }
        bool TerminadoCat { get; set; }
        DateTime FechaTerminadoCat { get; set; }

        EK.Modelo.Kontrol.Interfaces.IBaseUsuario opcionAbrir { get; set; }
    }
}
