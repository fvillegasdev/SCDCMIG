using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_GrupoInsumo")]
    public interface IGrupoInsumo : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string IdTipoInsumo { get; set; }

        [m.Kontrol.Column()]
        string IdInventariadoGrupoInsumo { get; set; }

        [m.Kontrol.Column()]
        string IdPresupuestoGrupoInsumo { get; set; }

        [m.Kontrol.Column()]
        string IdValidaPresupuesto { get; set; }

        [m.Kontrol.Column()]
        bool ValidaPresupuestoImporte { get; set; }
        [m.Kontrol.Column()]
        bool ValidaPresupuestoCantidad { get; set; }
        [m.Kontrol.Column()]
        bool ValidaPresupuestoPrecio { get; set; }
        [m.Kontrol.Column()]
        bool TransfierePoliza { get; set; }



        m.SCCO.Interfaces.ITipoInsumo TipoInsumo { get; set; }

        m.Kontrol.Interfaces.IItemGeneral InventariadoGrupoInsumo { get; set; }

        m.Kontrol.Interfaces.IItemGeneral PresupuestoGrupoInsumo { get; set; }

        m.Kontrol.Interfaces.IItemGeneral ValidaPresupuesto { get; set; }
    }
}
