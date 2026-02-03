using m = EK.Modelo;
namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_ResidentesObras")]
    public interface IResidenteObra
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdObra { get; set; }

        [m.Kontrol.Column()]
        int? IdResidente { get; set; }
        
        m.SCCO.Interfaces.IObra Obra { get; set; }
    }
}
