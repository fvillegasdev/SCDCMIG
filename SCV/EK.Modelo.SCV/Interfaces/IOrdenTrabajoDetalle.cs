using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_OrdenTrabajo_detalle")]
    public interface IOrdenTrabajoDetalle :
        m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("IdOT")]
        int IdOrdenTrabajo { get; set; }

        [m.Kontrol.Column("IdPartida")]
        int IdPartida { get; set; }

        [m.Kontrol.Column("Observaciones")]
        string Observaciones { get; set; }

        //m.SCV.Interfaces.IReporteFallaDetalle Partida { get; set; }
        m.SCV.Interfaces.IIncidencia  Incidencia { get; set; }

        [m.Kontrol.Column("IdIncidencia")]
        int IdIncidencia { get; set; }


    }
}