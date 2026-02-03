using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("BitacoraAutorizacionIncidencias")]
    public interface IBitacoraAutorizacionIncidencia : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Id",true)]
        int Id { get; set; }

        [m.Kontrol.Column("Plaza")]
        string Plaza { get; set; }

        [m.Kontrol.Column("Cliente")]
        int Cliente { get; set; }

        [m.Kontrol.Column("Folio")]
        int Folio { get; set; }

        [m.Kontrol.Column("Incidencia")]
        int Incidencia { get; set; }

        [m.Kontrol.Column("FechaEntregaVivienda")]
        DateTime FechaEntregaVivienda { get; set; }

        [m.Kontrol.Column("VencimientoGarantia")]
        DateTime VencimientoGarantia { get; set; }

        [m.Kontrol.Column("FechaAutorizacion")]
        DateTime FechaAutorizacion { get; set; }

        [m.Kontrol.Column("UsuarioAutorizo")]
        int UsuarioAutorizo { get; set; }

        [m.Kontrol.Column("NoIncidencia")]
        int NoIncidencia { get; set; }
    }
}
