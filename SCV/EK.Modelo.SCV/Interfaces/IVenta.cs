using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Ventas")]
    public interface IVenta
        : m.Kontrol.Interfaces.IBaseKontrolMM, m.SCV.Interfaces.ICotizacion
    {
        //CJCC 9Abr18
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column()]
        int? IdAgente { get; set; }
        IAgente Agente { get; set; }

        [m.Kontrol.Column()]
        int? IdPuntoVenta { get; set; }
        IPuntoVenta PuntoVenta { get; set; }

        [m.Kontrol.Column()]
        int? IdGradoInteres { get; set; }
        m.Kontrol.Interfaces.IItemGeneral GradoInteres { get; set; }

        [m.Kontrol.Column()]
        int? IdClienteRecomienda { get; set; }
        ICliente ClienteRecomienda { get; set; }

        [m.Kontrol.Column()]
        int? IdDesarrollo { get; set; }
        IDesarrollos Desarrollo { get; set; }

        [m.Kontrol.Column()]
        int IdEstatusVenta { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusVenta { get; set; }

        [m.Kontrol.Column()]
        int IdExpediente { get; set; }

        [m.Kontrol.Column()]
        int? IdCotizacion { get; set; }

        [m.Kontrol.Column()]
        new decimal? Importe { get; set; }

        [m.Kontrol.Column()]
        new decimal? ImporteMoneda { get; set; }

        //[m.Kontrol.Column()]
        //int? IdTipoCliente { get; set; }

        IExpediente Expediente { get; set; }
        IVentaProceso VentaProceso { get; set; }

        int? IdCliente { get; set; }
        ICliente Cliente { get; set; }

        IVentaPP PlanPagos { get; set; }
        List<IVentaPPConcepto> Conceptos { get; set; }
        List<IVentaUbicacion> Ubicaciones { get; set; }
        IVentaFinanciamiento Financiamiento { get; set; }
        bool ReadOnlyKontrol { get; set; }
        bool AllowToCotizar { get; set; }
        List<m.SCV.Interfaces.IVenta> Cotizaciones { get; set; }
        //m.Kontrol.Interfaces.IItemGeneral TipoCliente { get; set; }

        ITipoComercializacion TipoComercializacion { get; set; }
        IFaseExpediente Fase { get; set; }
        IEtapa Etapa { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Proceso { get; set; }

        int? Factura { get; set; }
        

    }
}