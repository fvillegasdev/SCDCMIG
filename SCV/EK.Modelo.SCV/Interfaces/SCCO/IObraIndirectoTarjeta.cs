using m = EK.Modelo;
namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Obra_IndirectosTarjetas")]
    public interface IObraIndirectoTarjeta
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdObra { get; set; }
        [m.Kontrol.Column()]
        int? IdTarjeta { get; set; }
        [m.Kontrol.Column()]
        decimal? Porcentaje { get; set; }
        [m.Kontrol.Column()]
        decimal? MontoValuacion { get; set; }
        m.SCCO.Interfaces.IObra Obra { get; set; }
        m.SCCO.Interfaces.IInsumoTarjeta Tarjeta { get; set; }
    }
}