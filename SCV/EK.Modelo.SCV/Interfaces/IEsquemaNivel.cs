using System.Collections.Generic;
using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEsquemaNivel : mk.Interfaces.IBaseKontrol
    {
        int IdEsquema { get; set; }
        int? Orden { get; set; }
        List<m.Interfaces.IEsquemaEtapa> Etapas { get; set; }
    }
}