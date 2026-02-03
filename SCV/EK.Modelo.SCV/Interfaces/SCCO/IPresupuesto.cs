using System.Dynamic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Presupuestos")]
    public interface IPresupuesto
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdObra { get; set; }
        m.SCCO.Interfaces.IObra Obra { get; set; }

        [m.Kontrol.Column()]
        int IdTabulador { get; set; }
        m.SCCO.Interfaces.ITabulador Tabulador { get; set; }

        [m.Kontrol.Column()]
        int IdTipoPresupuesto { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoPresupuesto { get; set; }

        [m.Kontrol.Column()]
        int IdEstatusPresupuesto { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusPresupuesto { get; set; }

        object Presupuesto { get; set; }
    }
}