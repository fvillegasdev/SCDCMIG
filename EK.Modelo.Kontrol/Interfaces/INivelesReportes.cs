using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("nivelesreportes")]
    public interface INivelesReportes
        : IBaseKontrol
    {
        [Column()]
        int IdReporte { get; set; }

        [Column()]
        int Permisos { get; set; }

        [Column()]
        int IdNivel { get; set; }

        int IdModulo { get; set; }

        IOpcionModulo Reporte { get; set; }
        INivel Nivel { get; set; }
        IModulo Modulo { get; set; }
        //Propiedades Anuladas

        [Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        [Kontrol.Column("Creado", true)]
        new DateTime Creado { get; set; }

        [Kontrol.Column("CreadoPor", true)]
        new int IdCreadoPor { get; set; }

        [Kontrol.Column("ModificadoPor", true)]
        new int IdModificadoPor { get; set; }

        [Kontrol.Column("Modificado", true)]
        new DateTime Modificado { get; set; }


        [Kontrol.Column("IdEstatus", true)]
        new int IdEstatus { get; set; }
    }
}
