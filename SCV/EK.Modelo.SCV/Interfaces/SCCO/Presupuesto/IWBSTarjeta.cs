using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_wbs_tarjetas")]
    public interface IWBSTarjeta : m.SCCO.Interfaces.IWBSComposite
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdTarjeta { get; set; }
        m.SCCO.Interfaces.IInsumoTarjeta Tarjeta { get; set; }

        [m.Kontrol.Column()]
        new int IdNodo { get; set; }
    }
}