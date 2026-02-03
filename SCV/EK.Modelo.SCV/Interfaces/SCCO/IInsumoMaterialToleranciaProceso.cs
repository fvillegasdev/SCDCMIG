using m = EK.Modelo;
namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_InsumosMateriales_ToleranciaProcesos")]
    public interface IInsumoMaterialToleranciaProceso
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdInsumoMaterial { get; set; }
        [m.Kontrol.Column()]
        int? IdProceso { get; set; }
        [m.Kontrol.Column()]
        int? Tolerancia { get; set; }

        m.SCCO.Interfaces.IInsumoMaterial InsumoMaterial { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Proceso { get; set; }

    }
}
