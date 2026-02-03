using m = EK.Modelo;
namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Obra_Niveles")]
    public interface IObraNivel
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int Nivel { get; set; }
        [m.Kontrol.Column()]
        int? IdObra { get; set; }
        [m.Kontrol.Column()]
        int? IdWBSNivel { get; set; }    
        [m.Kontrol.Column()]
        int? IdTipoNivel { get; set; }

        m.SCCO.Interfaces.IObra Obra { get; set; }
        m.Kontrol.Interfaces.IItemGeneral WBSNivel { get; set; }
        m.SCCO.Interfaces.ITipoNivelesPresupuesto TipoNivel { get; set; }
    }
}
