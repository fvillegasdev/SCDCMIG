using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("PullNotificationsFiles")]

    public interface IPullNotificationsFiles : IBaseKontrol
    {
        //Excluyen
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Modificado", true)]
        new string Modificado { get; set; }

        [m.Kontrol.Column("IdModificadoPor", true)]
        new string IdModificadoPor { get; set; }

        //Entidad Principal
        [m.Kontrol.Column()]
        string EntityType { get; set; }

        [m.Kontrol.Column()]
        string Modulo { get; set; }

        [m.Kontrol.Column()]
        string Tipo { get; set; }

        [m.Kontrol.Column()]
        string Uid { get; set; }

        [m.Kontrol.Column()]
        string StoragePath { get; set; }

        [m.Kontrol.Column()]
        long FileSize { get; set; }

        [m.Kontrol.Column()]
        string FileType { get; set; }

        [m.Kontrol.Column()]
        string FileExtension { get; set; }

        [m.Kontrol.Column()]
        int IdPullNotifications { get; set; }
    }

}


