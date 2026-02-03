using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IVentaPPDocumento : IBaseKontrolMM
    {
        int IdConceptoPago { get; set; }
        int IdVenta { get; set; }
        int Numero { get; set; }
        DateTime Vencimiento { get; set; }
        IItemGeneral TipoAbono { get; set; }
        int? IdVentaVersion { get; set; }
        IVentaVersion VentaVersion { get; set; }
    }
}