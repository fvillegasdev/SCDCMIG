using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_TipoMovimiento")]
    public interface ITipoMovimiento 
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int Cancelar { get; set; }

        [m.Kontrol.Column()]
        int IdNaturaleza { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Naturaleza { get; set; }
    }
}
