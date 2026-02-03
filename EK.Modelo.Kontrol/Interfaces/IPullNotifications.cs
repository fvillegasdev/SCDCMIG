using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("PullNotifications")]

    public interface IPullNotifications : IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Modificado", true)]
        new string Modificado { get; set; }

        [m.Kontrol.Column("IdModificadoPor", true)]
        new string IdModificadoPor { get; set; }
        [m.Kontrol.Column("IdEstatus", true)]
        new string IdEstatus { get; set; }

        [m.Kontrol.Column()]
        int? IdEntidad { get; set; }

        [m.Kontrol.Column()]
        int? IdRelacionEntidad { get; set; }

        [m.Kontrol.Column()]
        string Destinatario { get; set; }

        [m.Kontrol.Column()]
        string Titulo { get; set; }

        [m.Kontrol.Column()]
        string TipoEnvio { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaEnvio { get; set; }

        [m.Kontrol.Column()]
        bool Enviado { get; set; }

        [m.Kontrol.Column()]
        string AVID { get; set; }

        [m.Kontrol.Column()]
        string ATID { get; set; }
    }

}


