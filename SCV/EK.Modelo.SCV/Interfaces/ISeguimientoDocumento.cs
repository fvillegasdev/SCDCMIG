using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface ISeguimientoDocumento : m.Kontrol.Interfaces.IBaseKontrol
    {
        int? IdExpediente { get; set; }
        int? IdSeguimiento { get; set; }

        int IdEtapa { get; set; }
        IEtapa Etapa { get; set; }

        int IdFase { get; set; }
        IFaseExpediente Fase { get; set; }

        int IdDocumento { get; set; }
        IDocumentoExpediente Documento { get; set; }

        int? IdFormatoImpresion { get; set; }
        m.Kontrol.Interfaces.IKontrolFile FormatoImpresion { get; set; }

        int? IdRequisitoRelacionado { get; set; }
        ISeguimientoRequisito RequisitoRelacionado { get; set; }

        int? ReadOnlyKontrol { get; set; }
    }
}