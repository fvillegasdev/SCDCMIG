using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_DocumentosExpediente")]
    public interface IDocumentoExpediente
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int NumeroCopias { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoDocumento { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoDocumento { get; set; }

        [m.Kontrol.Column()]
        int? IdPlantilla { get; set; }
        m.Kontrol.Interfaces.IPlantillasMails Plantilla { get; set; }
    }
}