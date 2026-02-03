using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IDashBoardExpedienteIndicador
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        int? IdFaseExpediente { get; set; }
        m.SCV.Interfaces.IFaseExpediente FaseExpediente { get; set; }
        m.SCV.Interfaces.IFaseExpediente Fase{ get; set; }
        int? IdMacroEtapa { get; set; }
        m.SCV.Interfaces.IMacroEtapa MacroEtapa { get; set; }
        int? IdEtapa { get; set; }
        m.SCV.Interfaces.IEtapa Etapa { get; set; }
        int CantidadActivos { get; set; }
        int CantidadSuspendidos { get; set; }
        int CantidadPorVencer { get; set; }
        int CantidadVencidos { get; }
        int ConteoExpediente { get; set; }
        int CantidadProspectosSinExpedientes { get; set; }
        string IconoReg { get; set; }
        int? IdDesarrollo { get; set; }
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }
    }
}