using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IVentaProceso
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdVenta { get; set; }
        [m.Kontrol.Column()]
        int IdVentaProceso { get; set; }
        [m.Kontrol.Column()]
        int? IdEstatusProceso { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaInicio { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaFin { get; set; }
        m.Kontrol.Interfaces.IItemGeneral VentaProceso { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusProceso { get; set; }
    }
}