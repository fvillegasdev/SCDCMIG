using m = EK.Modelo;
namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Obra_Companias")]
    public interface IObraCompania
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdObra { get; set; }
        [m.Kontrol.Column()]
        int? IdCompania { get; set; }

        m.SCCO.Interfaces.IObra Obra { get; set; }        
        m.Kontrol.Interfaces.ICompania Compania { get; set; }
    }
}
