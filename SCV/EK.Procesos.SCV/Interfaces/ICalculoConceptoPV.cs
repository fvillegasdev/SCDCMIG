using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV.Interfaces
{
    public interface ICalculoConceptoPV
    {
        double TipoCambio { get; set; }
        DateTime FechaActual { get; set; }
        List<EK.Modelo.Kontrol.Interfaces.IItemGeneral> TiposAbono { get; set; }
        Task Calcular(IVenta venta, IVentaPPConcepto concepto);
    }
}
