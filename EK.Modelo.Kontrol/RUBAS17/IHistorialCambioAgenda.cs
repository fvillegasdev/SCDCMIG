using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("HistorialAgendaModificada")]
    public interface IHistorialCambioAgenda : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int ID { get; set; }

        [m.Kontrol.Column()]
        int NoCliente { get; set; }

        [m.Kontrol.Column()]
        int IdTipoAgenda { get; set; }

        [m.Kontrol.Column()]
        int IdAgenda { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaOriginal { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaModificada { get; set; }

        [m.Kontrol.Column()]
        string IdPlaza { get; set; }

        [m.Kontrol.Column()]
        int UsuarioModifico { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaModifico { get; set; }

        [m.Kontrol.Column()]
        string MotivoModificacion { get; set; }
        [m.Kontrol.Column()]
        string TipoAgenda { get; set; }
        [m.Kontrol.Column()]
        string NombrePlaza { get; set; }
        [m.Kontrol.Column()]
        string NombreUsuario { get; set; }
    }
}
