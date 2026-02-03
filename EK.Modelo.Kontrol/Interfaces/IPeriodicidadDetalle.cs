using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("PeriodicidadDetalles")]
    public interface IPeriodicidadDetalle : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdPeriodicidad { get; set; }

        [m.Kontrol.Column()]
        int IdAnio { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaInicio { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaFin { get; set; }


        [m.Kontrol.Column()]
        int N { get; set; }


        m.Kontrol.Interfaces.IPeriodicidad Periodicidad { get; set; }
    }
}
