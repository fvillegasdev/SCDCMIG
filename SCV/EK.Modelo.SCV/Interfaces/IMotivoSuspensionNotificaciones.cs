using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_MotivoSuspension_Notificaciones")]
    public interface IMotivoSuspensionNotificaciones : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdMotivoSuspension { get; set; }

        [m.Kontrol.Column()]
        int IdRegistro { get; set; }


        [m.Kontrol.Column()]
        int IdTipoNotificador { get; set; }


        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        Kontrol.Interfaces.IItemGeneral TipoNotificador { get; set; }
        Kontrol.Interfaces.IItemGeneral Registro { get; set; }
        Kontrol.Interfaces.IItemGeneral MotivoSuspension { get; set; }



    }
}
