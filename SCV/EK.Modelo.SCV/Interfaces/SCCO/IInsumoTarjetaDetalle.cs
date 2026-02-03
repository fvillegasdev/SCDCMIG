using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_InsumosTarjetas_detalle")]
    public interface IInsumoTarjetaDetalle
      : m.Kontrol.Interfaces.IBaseKontrol
    {
        /** base excluded **/
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        /** base excluded **/

        [m.Kontrol.Column()]
        int IdInsumo { get; set; }
        m.SCCO.Interfaces.IInsumo Insumo { get; set; }

        [m.Kontrol.Column()]
        int IdInsumoTarjeta { get; set; }

        [m.Kontrol.Column()]
        decimal Cantidad { get; set; }

        [m.Kontrol.Column()]
        decimal Importe { get; set; }

        [m.Kontrol.Column()]
        decimal ImporteMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal Precio { get; set; }

        [m.Kontrol.Column()]
        decimal PrecioMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal TipoCambio { get; set; }

        [m.Kontrol.Column()]
        int IdMoneda { get; set; }
        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }
    }
}