using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_FasesExpediente")]

    public interface IFaseExpediente
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int Orden { get; set; }
        [m.Kontrol.Column()]
        string IconoReg { get; set; }

        [m.Kontrol.Column()]
        int? IdProceso { get; set; }
        m.SCV.Interfaces.IProceso Proceso { get; set; }

        [m.Kontrol.Column()]
        int IdTipoExpediente { get; set; }
        m.SCV.Interfaces.ITiposExpediente TipoExpediente { get; set; }
    }
}