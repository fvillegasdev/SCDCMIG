using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IVentaPP
        : IBaseKontrol
    {
        int IdPlanVenta { get; set; }
        string Descripcion { get; set; }
        List<IVentaPPConcepto> Conceptos { get; set; }
        int IdExpediente { get; set; }
        int IdVenta { get; set; }
        int? IdVentaVersion { get; set; }
        IVentaVersion VentaVersion { get; set; }
    }
}