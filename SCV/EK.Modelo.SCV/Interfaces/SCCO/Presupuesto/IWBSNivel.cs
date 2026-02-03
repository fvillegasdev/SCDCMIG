using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_wbs_niveles")]
    public interface IWBSNivel : m.SCCO.Interfaces.IWBSComposite
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int? IdNivelPresupuesto { get; set; }
        m.Kontrol.Interfaces.IItemGeneral NivelPresupuesto { get; set; }

        [m.Kontrol.Column()]
        int IdTipoNivelPresupuesto { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoNivelPresupuesto { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoAvance { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoAvance { get; set; }

        [m.Kontrol.Column()]
        int? Unidades { get; set; }

        [m.Kontrol.Column()]
        new int IdNodo { get; set; }
    }
}