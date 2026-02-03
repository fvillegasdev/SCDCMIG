using EK.Modelo.Kontrol;
using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("Notificaciones")]
    public interface ISCVNotification
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [Column()]
        string Descripcion { get; set; }


        [Column()]
        string Link { get; set; }


        [Column()]
        bool Leido { get; set; }


        [Column()]
        DateTime? LeidoEn { get; set; }


        [Column()]
        bool Externo { get; set; }

        [Column()]
        int? IdNotificacion { get; set; }

        [Column()]
        int IdEntidad { get; set; }


        [Column()]
        string TipoEntidad { get; set; }



        int? idCliente { get; set; }
        int? idExpediente { get; set; }

        ISCVNotification Notificacion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Entidad { get; set; }
    }
}
