using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEsquemaEtapaRequisito : mk.Interfaces.IBaseKontrol
    {
        int IdEsquema { get; set; }
        int IdEtapa { get; set; }
        m.Interfaces.IEsquemaEtapa Etapa { get; set; }
        int? PlazoDias { get; set; }
        bool Obligatorio { get; set; }
        int IdRequisito { get; set; }
        m.Interfaces.IRequisito Requisito { get; set; }
    }
}