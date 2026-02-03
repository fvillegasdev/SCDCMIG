using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("NivelesEtapas")]
    public interface INivelesEtapas
        : IBaseKontrol
    {

        [Column()]
        int? Orden { get; set; }

        [Column()]
        int? IdNivel { get; set; }

        [Column()]
        int? IdEtapa { get; set; }

        [Column()]
        bool? EtapaAsignada { get; set; }

        INivel Nivel { get; set; }
        IItemGeneral Etapa { get; set; }



        /*Propiedades Anuladas*/
        [Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

    }
}
