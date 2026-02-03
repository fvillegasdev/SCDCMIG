using System;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV.Interfaces
{
    public interface ICalculoPlanVenta
    {
        Task Calcular(IVenta venta);
        Task Calcular(IVenta venta, IVentaPPConcepto concepto);
        Task Calcular(IVenta venta, IVentaPPConcepto concepto, IAbono abono);
    }
}