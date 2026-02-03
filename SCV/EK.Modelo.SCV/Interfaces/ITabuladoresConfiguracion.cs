using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Tabulador_Configuracion")]
    public interface ITabuladoresConfiguracion
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int Minimo { get; set; }

        [m.Kontrol.Column()]
        int Maximo { get; set; } 

        [m.Kontrol.Column()]
        int Importe { get; set; }

        [m.Kontrol.Column()]
        int Porcentaje { get; set; }

        [m.Kontrol.Column()]
        int? IdTabulador { get; set; }
        ITabuladores Tabulador { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
    }
}
