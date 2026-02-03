using System.Collections.Generic;
using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEsquema : mk.Interfaces.IBaseKontrol
    {
        int IdFaseExpediente { get; set; }
        m.Interfaces.IFaseExpediente FaseExpediente { get; set; }
        List<m.Interfaces.IEsquemaNivel> Niveles { get; set; }
    }
}