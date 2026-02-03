using m = EK.Modelo;
namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Obra_Indirectos")]
    public interface IObraIndirecto
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdObra { get; set; }
        [m.Kontrol.Column()]
        int? IdNivel { get; set; }        
        [m.Kontrol.Column()]
        decimal? Porcentaje { get; set; }
        [m.Kontrol.Column()]
        int? IdTipoIndirecto { get; set; }
        [m.Kontrol.Column()]
        int? IdTipoInsumo { get; set; }
        
        m.SCCO.Interfaces.IObra Obra { get; set; }
        m.SCCO.Interfaces.ITipoInsumo TipoInsumo { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Nivel { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoIndirecto { get; set; }
    }
}
