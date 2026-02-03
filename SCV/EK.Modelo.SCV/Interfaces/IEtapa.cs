using EK.Modelo.Kontrol.Interfaces;

using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Etapas")]
    public interface IEtapa : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int PlazoEstandar { get; set; }

        [m.Kontrol.Column()]
        int IdMacroEtapa { get; set; }

        m.SCV.Interfaces.IMacroEtapa MacroEtapa { get; set; }

        [m.Kontrol.Column()]
        int IdFaseExpediente { get; set; }

        m.SCV.Interfaces.IFaseExpediente FaseExpediente { get; set; }
    }
}