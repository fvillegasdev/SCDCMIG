using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Expedientes_Tags")]
    public interface IExpedienteTags :
        m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [m.Kontrol.Column()]
        int IdTag { get; set; }


        [m.Kontrol.Column]
        int IdExpediente { get; set; }

        m.SCV.Interfaces.IExpediente Expediente { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Tag { get; set; }

    }
}
