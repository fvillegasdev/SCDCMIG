using System;
using System.Collections.Generic;

namespace EK.Modelo.Kontrol.Interfaces
{

    [Table("AgendaRestriccionFechaCat")]
    public interface IAgendaFechaBloqueo : IBaseKontrol
    {
        [Column()]
        int Id { get; set; }

        [Column()]
        int IdUsuario { get; set; }

        [Column()]
        DateTime FechaBloqueoIni { get; set; }
        DateTime FechaBloqueoFin { get; set; }

        [Column()]
        bool activo { get; set; }
    }
}
