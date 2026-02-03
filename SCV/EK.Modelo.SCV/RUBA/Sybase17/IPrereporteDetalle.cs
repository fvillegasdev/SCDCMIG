using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_prereporte_det")]
    public interface IPrereporteDetalle
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        //[m.Kontrol.Column("Clave", true)]
        //new string Clave { get; set; }

        //[m.Kontrol.Column("Nombre", true)]
        //new string Nombre { get; set; }

        [m.Kontrol.Column("numcte")]
        int IdCliente { get; set; }
        m.SCV.Interfaces.IClientesSPV Cliente { get; set; }

        [m.Kontrol.Column("idreporte")]
        int IdPrereporte { get; set; }

        [m.Kontrol.Column("partida")]
        int Partida { get; set; }

        [m.Kontrol.Column("ubicacion_falla")]
        int? IdUbicacionFalla { get; set; }
        m.SCV.Interfaces.IUbicacionesFalla UbicacionFalla { get; set; }

        [m.Kontrol.Column("observaciones")]
        string Observaciones { get; set; }

        [m.Kontrol.Column("imagen")]
        string Imagenes { get; set; }

        [m.Kontrol.Column("estatus")]
        int EstatusPartida { get; set; }

        [m.Kontrol.Column("EstatusApp")]
        string EstatusApp { get; set; }
        int IdPrereporteDetalle { get; set; }

        [m.Kontrol.Column("FechaAgenda")]
        DateTime FechaAgenda { get; set; }
    }
}