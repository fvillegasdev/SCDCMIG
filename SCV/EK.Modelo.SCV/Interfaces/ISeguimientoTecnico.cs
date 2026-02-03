using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Seguimiento_Tecnico")]
    public interface ISeguimientoTecnico
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column()]
        int? IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        [m.Kontrol.Column()]
        int? IdTramite { get; set; }
        m.SCV.Interfaces.ITramiteAsignadoConfiguracion Tramite { get; set; }

        [m.Kontrol.Column("Completado", true)]
        bool? Completado { get; set; }

        [m.Kontrol.Column("FechaCreadoSeguimiento", true)]
        DateTime FechaCompletado { get; set; }

    }
}
