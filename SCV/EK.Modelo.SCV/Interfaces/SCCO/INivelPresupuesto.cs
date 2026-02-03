using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_NivelesPresupuesto")]
    public interface INivelPresupuesto
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdTipoNivel { get; set; }
        m.SCCO.Interfaces.ITipoNivelesPresupuesto TipoNivel { get; set; }
    }
}