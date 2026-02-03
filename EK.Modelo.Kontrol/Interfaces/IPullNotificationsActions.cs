using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("PullNotificationsActions")]

    public interface IPullNotificationsActions : IBaseKontrol
    {
        [m.Kontrol.Column()]
        string IdEntidad { get; set; }

        [m.Kontrol.Column()]
        string RutaEnlace { get; set; }

        IPullNotifications Entidad { get; set; }
    }

}


