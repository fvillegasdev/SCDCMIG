using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_MacroEtapas")]

    public interface IMacroEtapa
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdFaseExpediente { get; set; }

        m.SCV.Interfaces.IFaseExpediente FaseExpediente { get; set; }
    }
}