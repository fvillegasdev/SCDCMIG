using System;

using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_AnticiposDeducciones")]
    public interface IAnticiposDeducciones : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        Int32 IdTipoConcepto { get; set; }

        [m.Kontrol.Column()]
        Int32 IdTipoMovimiento { get; set; }

        [m.Kontrol.Column()]
        Int32 IdInsumo { get; set; }

        [m.Kontrol.Column()]
        Boolean AfectaFacturacion { get; set; }

        [m.Kontrol.Column()]
        Boolean AfectaOc { get; set; }

        [m.Kontrol.Column()]
        decimal? PorcentajeDefault { get; set; }

        [m.Kontrol.Column()]
        Boolean AplicaIva { get; set; }


        m.SCP.Interfaces.ITipoMovimientoProveedor TipoMovimiento { get; set; }

        m.SCCO.Interfaces.IInsumo Insumo { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoConcepto{ get; set;}

    }
}
