using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ConceptosPago")]
    public interface IConceptoPago : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdTipoConceptoPago { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoConceptoPago { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoMovimiento_Capital { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoMovimiento_Interes { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoMovimiento_Moratorio { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoMovimiento_Capital_Cancelacion { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoMovimiento_Interes_Cancelacion { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoMovimiento_PagoAnticipo { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoMovimiento_TraspasoCredito { get; set; }
    }
}
