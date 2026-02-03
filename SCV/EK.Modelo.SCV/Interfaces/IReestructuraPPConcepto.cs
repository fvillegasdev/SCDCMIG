using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IReestructuraPPConcepto
        : IBaseKontrol
    {
        decimal Pagado { get; set; }
        int VersionPP { get; set; }
        IVentaPPConcepto Concepto { get; set; }
        int IdPlanVenta { get; set; }
    }
}
