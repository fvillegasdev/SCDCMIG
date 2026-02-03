using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
using mo = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [mo.Kontrol.Table("scv_Ventas_PPConceptosPago")]
    public interface IVentaPPConcepto : IBaseKontrolMM
    {
        int IdVenta { get; set; }
        IConceptoPago ConceptoPago { get; set; }
        IItemGeneral FrecuenciaPago { get; set; }
        int? NumeroPagos { get; set; }
        decimal? Porcentaje { get; set; }
        decimal? PorcentajeTIF { get; set; }
        decimal? PorcentajeTIM { get; set; }
        int? NumeroPlazoPrimerPago { get; set; }
        IItemGeneral PeriodoPrimerPago { get; set; }
        bool Modificable { get; set; }
        List<IDocumentoPago> Documentos { get; set; }
        List<IAbono> Abonos { get; set; }
        int? IdVentaVersion { get; set; }
        IVentaVersion VentaVersion { get; set; }


        [m.Kontrol.Column()]
        decimal? ImporteReembolsable { get; set; }


        [m.Kontrol.Column()]
        decimal? ImporteReembolsableMoneda { get; set; }


        [m.Kontrol.Column()]
        decimal? PorcentajeReembolso { get; set; }


        [m.Kontrol.Column()]
        string Formula { get; set; }


        [m.Kontrol.Column()]
        int? Orden { get; set; }

        [m.Kontrol.Column()]
        bool? Venta { get; set; }

        [m.Kontrol.Column()]
        bool? Reestructura { get; set; }


        [m.Kontrol.Column()]
        bool? Finiquito { get; set; }

    }
}