using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_prereporte")]
    public interface IPrereporte
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("numcte")]
        int IdCliente { get; set; }
        m.SCV.Interfaces.IClientesSPV Cliente { get; set; }

        int? IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        [m.Kontrol.Column("idreporte")]
        int IdPrereporte { get; set; }

        [m.Kontrol.Column("fecha")]
        DateTime? FechaCaptura { get; set; }

        [m.Kontrol.Column("FechaEntrega", true)]
        DateTime? FechaEntrega { get; set; }

        [m.Kontrol.Column("folio")]
        int? IdReporte { get; set; }

        [m.Kontrol.Column("calificacion",true)]
        int? Calificacion { get; set; }

        [m.Kontrol.Column("calificacionObservacion", true)]
        string CalificacionObservacion { get; set; }

        [m.Kontrol.Column("calificado", true)]
        int? Calificado { get; set; }

        [m.Kontrol.Column("estatus")]
        int? EstatusReporteId { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusReporte { get; set; }

        List<m.SCV.Interfaces.IPrereporteDetalle> Partidas { get; set; }
    }
}