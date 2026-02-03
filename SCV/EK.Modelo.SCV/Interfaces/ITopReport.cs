using System;
using System.Collections.Generic;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCV.Interfaces
{
    public interface ITopReport : m.Kontrol.Interfaces.IBaseKontrol
    {
        int Cantidad { get; set; }
        decimal PorcentajeTop { get; set; }
        int Total { get; set; }
    }
}