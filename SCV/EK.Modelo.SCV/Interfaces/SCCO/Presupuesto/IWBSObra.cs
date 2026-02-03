using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_wbs_obras")]
    public interface IWBSObra : m.SCCO.Interfaces.IWBSComposite
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdObra { get; set; }

        [m.Kontrol.Column()]
        int IdTabulador { get; set; }

        [m.Kontrol.Column()]
        int IdTipoPresupuesto { get; set; }

        [m.Kontrol.Column()]
        new int IdNodo { get; set; }
    }
}