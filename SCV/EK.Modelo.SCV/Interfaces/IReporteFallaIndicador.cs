using System;
using System.Collections.Generic;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IReporteFallaIndicador : m.Kontrol.Interfaces.IBaseKontrol
    {
        int CantidadActivas { get; set; }
        int CantidadCanceladas { get; set; }
        int CantidadPorVencer { get; set; }
        int CantidadVencidas { get; }
        int CantidadSuspendidas { get; set; }
        int CantidadReprogramadas { get; set; }
        int CantidadAtendidas { get; set; }
        int CantidadFinalizadas { get; set; }
        int ConteoExpediente { get; set; }
        int CantidadDictamenesActivos { get; set; }
        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }
    }
}