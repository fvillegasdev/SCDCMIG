using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IDashBoardConfiguracion
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        int? IdFaseExpediente { get; set; }
        m.SCV.Interfaces.IFaseExpediente FaseExpediente { get; set; }
        int? IdMacroEtapa { get; set; }
        m.SCV.Interfaces.IMacroEtapa MacroEtapa { get; set; }
        int? IdEtapa { get; set; }
        m.SCV.Interfaces.IEtapa Etapa { get; set; }
        int IdUsuario { get; set; }
        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }
    }
}