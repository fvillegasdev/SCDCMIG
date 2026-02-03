using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Tabuladores_Insumos")]
    public interface ITabuladorInsumo
      : m.Kontrol.Interfaces.IBaseKontrol
    {
        /** base excluded **/
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        /** base excluded **/

        [m.Kontrol.Column()]
        int IdObra { get; set; }
        m.SCCO.Interfaces.IObra Obra { get; set; }

        [m.Kontrol.Column()]
        int IdTipoPresupuesto { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoPresupuesto { get; set; }

        [m.Kontrol.Column()]
        int IdInsumo { get; set; }
        m.SCCO.Interfaces.IInsumo Insumo { get; set; }

        [m.Kontrol.Column()]
        int IdTabulador { get; set; }
        m.SCCO.Interfaces.ITabulador Tabulador { get; set; }

        [m.Kontrol.Column()]
        int IdMoneda { get; set; }
        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }

        [m.Kontrol.Column()]
        decimal TipoCambio { get; set; }

        [m.Kontrol.Column()]
        decimal Precio { get; set; }

        [m.Kontrol.Column()]
        decimal PrecioMoneda { get; set; }
    }
}