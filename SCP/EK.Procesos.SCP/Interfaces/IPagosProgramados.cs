using System;
using mKontrol = EK.Modelo.Kontrol;

namespace EK.Procesos.SCP.Interfaces
{
    public interface IPagosProgramados : Kontrol.Interfaces.IBaseProceso
    {
        [mKontrol.KontrolName("PagosProgramados")]
        object[] Get(int idcompania, int proveedorini, int proveedorfin, string ccInicial, string ccFinal, DateTime fechaCorte);
    }
}