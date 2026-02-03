using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_ordenes_trabajo_detalle")]
    public interface IOrdenTrabajoDetalleRUBA :
        m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("IdOrdenTrabajo")]
        int IdOrdenTrabajo { get; set; }

        [m.Kontrol.Column("IdPartida")]
        int IdPartida { get; set; }

        [m.Kontrol.Column("Observaciones")]
        string Observaciones { get; set; }

        [m.Kontrol.Column("ObservacionesCat")]
        string ObservacionesCat { get; set; }

        [m.Kontrol.Column("fecha_fin_OT")]
        DateTime? FechaFinOT { get; set; }

        string ObservacionesCatDiag { get; set; }

        [m.Kontrol.Column("usuario_fin_OT")]
        int? UsuarioFinOT { get; set; }

        string ResponsableDictamen { get; set; }
        m.SCV.Interfaces.IReporteFallaDetalle Partida { get; set; }

        bool TerminadoCat { get; set; }
    }
}