using System;
using System.Collections.Generic;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
      public interface IAgendaIndicadores
        : IBaseKontrol
    {
        int CantidadActivas { get; set; }
        int CantidadCanceladas { get; set; }
        int CantidadPorVencer { get; set; }
        int CantidadVencidas { get; }
        int CantidadSuspendidas { get; set; }
        int CantidadReprogramadas { get; set; }
        int CantidadAtendidas { get; set; }
        int ConteoExpediente { get; set; }

        IUsuario Usuario { get; set; }
    }
}
