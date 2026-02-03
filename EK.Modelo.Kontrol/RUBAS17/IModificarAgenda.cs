using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Agenda")]
    public interface IModificarAgenda : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdTipoAgenda { get; set; }

        [m.Kontrol.Column()]
        string TipoAgenda { get; set; }

        [m.Kontrol.Column()]
        int IdEstatusAgenda { get; set; }

        [m.Kontrol.Column()]
        string EstatusAgenda { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaInicio { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaFin { get; set; }

        [m.Kontrol.Column()]
        int IdAgenda { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_entrega { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_construccion { get; set; }

        [m.Kontrol.Column()]
        int Cliente { get; set; }
        
        [m.Kontrol.Column()]
        string IdPlaza { get; set; }
    }
}
