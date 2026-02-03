using System;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("TareasManuales")]
    public interface ITareaManual
        : IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [Column("IdUser")]
        int IdAsignado { get; set; }
        m.Kontrol.Interfaces.IUsuario Asignado { get; set; }

        [Column()]
        int IdTipo { get; set; }
        m.Kontrol.Interfaces.ITipoCitas Tipo { get; set; }

        [Column()]
        int IdPrioridad { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Prioridad { get; set; }

        [Column()]
        int? IdCliente { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Cliente { get; set; }

        [Column()]
        int? IdExpediente { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Expediente { get; set; }


        [Column()]
        string Comentarios { get; set; }

        [Column()]
        int Completado { get; set; }

        [Column()]
        DateTime? FechaInicio { get; set; }

        [Column()]
        DateTime? FechaFin { get; set; }
    }
}
