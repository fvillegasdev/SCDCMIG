using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_wbs_insumos")]
    public interface IWBSInsumo : m.SCCO.Interfaces.IWBSBase
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdInsumo { get; set; }
        m.SCCO.Interfaces.IInsumo Insumo { get; set; }

        [m.Kontrol.Column()]
        new int IdNodo { get; set; }

        [m.Kontrol.Column()]
        int IdMoneda { get; set; }
        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }
    }
}