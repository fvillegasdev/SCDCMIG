using EK.Modelo.Kontrol.Interfaces;
using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_rangosingresos")]
    public interface IRangoIngresos 
        : IBaseKontrol
    {
        [m.Kontrol.Column()]
        decimal RangoInicial { get; set; }
        [m.Kontrol.Column()]
        decimal RangoFinal { get; set; }
        [m.Kontrol.Column()]
        int IdMoneda { get; set; }
        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }
    }
}