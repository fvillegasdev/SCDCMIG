using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface ISeguimientoEstados : m.Kontrol.Interfaces.IBaseKontrol
    {
        m.Kontrol.Interfaces.IItemGeneral Prospeccion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Venta { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Posventa { get; set; }
        decimal CantOrdSegProsp { get; set; }
        decimal CantOrdSegAvanProsp { get; set; }
        decimal CantOrdSegVenta { get; set; }
        decimal CantOrdSegAvanVenta { get; set; }
        decimal CantOrdSegPost { get; set; }
        decimal CantOrdSegAvanPost { get; set; }
     
    }
}