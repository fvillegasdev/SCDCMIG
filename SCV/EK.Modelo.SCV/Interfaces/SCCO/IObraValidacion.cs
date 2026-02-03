using m = EK.Modelo;
namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Obra_Validaciones")]
    public interface IObraValidacion
        :m.Kontrol.Interfaces.IBaseKontrol
    {        
        [m.Kontrol.Column()]
        int? IdObra { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoValidacion { get; set; }

        [m.Kontrol.Column()]
        int? IdOperacion { get; set; }

        [m.Kontrol.Column()]
        int? Valor { get; set; }

        m.SCCO.Interfaces.IObra Obra { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoValidacion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Operacion { get; set; }
    }
}
