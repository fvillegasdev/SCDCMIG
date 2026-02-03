using System;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("AgendaEntVivienda")]
    public interface IAgendaEntVivienda
        : IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("IdAgenda")]
        int? IdAgenda { get; set; }

        [m.Kontrol.Column("IdExpediente")]
        int? IdExpediente { get; set; }

        [m.Kontrol.Column("IdEstatusAgenda")]
        int? IdEstatusAgenda { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusAgenda { get; set; }

        [m.Kontrol.Column("IdUsuarioAsignado")]
        int? IdUsuarioAsignado { get; set; }
        m.Kontrol.Interfaces.IUsuario UsuarioAsignado { get; set; }

        string TipoAgenda { get; set; }

        [m.Kontrol.Column("IdMotivo")]
        int? IdMotivo { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Motivo { get; set; }

        [m.Kontrol.Column("Observaciones")]
        string Observaciones { get; set; }

        [m.Kontrol.Column("IdAgendaPadre")]
        int? IdAgendaPadre { get; set; }

        [m.Kontrol.Column("Reserva")]
        bool? Reserva { get; set; }

        string ImgEvidencia { get; set; }
        string btTipoAgenda { get; set; }
        int btIdTipoAgenda { get; set; }
        string btEstatusAgenda { get; set; }
        string TipoArchivo { get; set; }
        DateTime btFInicio { get; set; }
        DateTime btFFin { get; set; }
        string Extension { get; set; }
        string dbName { get; set; }
    }
}