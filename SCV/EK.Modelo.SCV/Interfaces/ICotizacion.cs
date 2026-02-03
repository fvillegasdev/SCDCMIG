//using m = EK.Modelo;

//namespace EK.Modelo.SCV.Interfaces
//{
//    [m.Kontrol.Table("scv_Cotizaciones")]
//    public interface ICotizacion
//         : m.Kontrol.Interfaces.IBaseKontrol
//    {
//        [m.Kontrol.Column()]
//        int? IdMoneda { get; set; }
//        [m.Kontrol.Column()]
//        int? IdAgente { get; set; }
//        [m.Kontrol.Column()]
//        int? IdPuntoVenta { get; set; }
//        [m.Kontrol.Column()]
//        int? IdGradoInteres { get; set; }
//        [m.Kontrol.Column()]
//        int? IdClienteRecomienda { get; set; }
//        [m.Kontrol.Column()]
//        int? IdEstatusCotizacion { get; set; }
//        [m.Kontrol.Column()]
//        int? IdDesarrollo { get; set; }
//        [m.Kontrol.Column()]
//        decimal? Importe { get; set; }
//        [m.Kontrol.Column()]
//        decimal? ImporteMoneda { get; set; }
//        [m.Kontrol.Column()]
//        decimal? TipoCambio { get; set; }
//        [m.Kontrol.Column()]
//        int? IdExpediente { get; set; }

//        int IdCliente { get; set; }
//        m.SCV.Interfaces.ICliente Cliente { get; set; }
//        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }
//        m.SCV.Interfaces.IPuntoVenta PuntoVenta { get; set; }
//        m.Kontrol.Interfaces.IItemGeneral GradoInteres { get; set; }
//        m.SCV.Interfaces.ICliente ClienteRecomienda { get; set; }
//        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }
//        m.Kontrol.Interfaces.IUsuario Agente { get; set; }
//        m.Kontrol.Interfaces.IItemGeneral EstatusCotizacion { get; set; }
//        m.SCV.Interfaces.IExpediente Expediente { get; set; }
//        m.SCV.Interfaces.IEsquema Esquema { get; set; }
//    }
//}

using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface ICotizacion
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        DateTime? FechaVigencia { get; set; }
        DateTime? FechaSeleccion { get; set; }
        int? IdEstatusCotizacion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusCotizacion { get; set; }
    }
}