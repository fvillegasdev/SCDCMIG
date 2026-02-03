using EK.Modelo.Kontrol.Interfaces;
using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Ventas_Version")]
    public interface IVentaVersion : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdVenta { get; set; }
        [m.Kontrol.Column()]
        int VentaVersion { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaInicio { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaFinal { get; set; }
        [m.Kontrol.Column()]
        int? IdEstatusVersion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusVersion { get; set; }
        [m.Kontrol.Column()]
        bool Actual { get; set; }
    }
}