using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("CentroCosto")]
    public interface ICentrosCosto
        : Interfaces.IBaseKontrolMM
    {
        [Column()]
        string TipoClasificador { get; set; }
        List<ICatalogoClasificador> Clasificadores { get; set; }

        [Column("Clasificadores")]
        int TotalClasificadores { get; set; }

        [m.Kontrol.Column()]
        int? IdValidacionPresupuesto { get; set; }
        [m.Kontrol.Column()]
        int? MontoGlobal { get; set; }
        m.Kontrol.Interfaces.IItemGeneral ValidacionPresupuesto { get; set; }
    }
}
