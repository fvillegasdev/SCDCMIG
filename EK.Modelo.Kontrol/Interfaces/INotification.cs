using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface INotificationElement {
    }

    public interface INotification
        :IBaseKontrol, INotificationElement
    {
        string Icon { get; set; }

        List<INotificationItem> NotificationItems { get; set; }
    }

    [Table("Notificaciones")]
    public interface IMessageNotification
        : IBaseKontrol, INotificationElement
    {
        [Column()]
        int idplantilla { get; set; }

        string Descripcion { get; set; }
        int? IdEntidad { get; set; }

        [Column()]
        string Link { get; set; }

        [Column()]
        bool Leido { get; set; }

        [Column()]
        DateTime? LeidoEn { get; set; }

        [Column()]
        bool Externo { get; set; }

        IMessageNotification Notificacion { get; set; }

        //[Column()]
        //int? IdEntidad { get; set; }

        [Column()]
        string TipoEntidad { get; set; }

        [Column()]
        int? IdNotificacion { get; set; }


        IItemGeneral Entidad { get; set; }
        [Column()]
        bool FromApp { get; set; }

        [Column()]
        string Folio { get; set; }

        [Column()]
        string Ubicacion { get; set; }
        int IdOrdenTrabajo { get; set; }

    }


    public interface INotificationItem
        : INotificationElement
    {
        int Id { get; set; }
        string Time { get; set; }
        string Title { get; set; }
        string Image { get; set; }
        string Text { get; set; }        
        int Data { get; set; }
        int? ValueNow { get; set; }
    }
}
