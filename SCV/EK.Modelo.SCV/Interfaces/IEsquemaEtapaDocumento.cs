using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEsquemaEtapaDocumento : mk.Interfaces.IBaseKontrol
    {
        int IdEsquema { get; set; }
        m.Interfaces.IEtapa Etapa { get; set; }
        int IdEtapa { get; set; }
        int IdDocumento { get; set; }
        m.Interfaces.IDocumentoExpediente Documento { get; set; }

        int? IdRequisitoRelacionado { get; set; }
        m.Interfaces.IRequisito RequisitoRelacionado { get; set; }
    }
}