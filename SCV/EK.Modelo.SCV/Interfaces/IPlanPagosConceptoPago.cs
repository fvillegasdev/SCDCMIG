using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Planes_Pagos_ConceptosPago")]
    public interface IPlanPagosConceptoPago : IBaseKontrol
    {

        [m.Kontrol.Column()]
        int? NumeroPagos { get; set; }

        [m.Kontrol.Column()]
        decimal? Importe { get; set; }

        [m.Kontrol.Column()]
        decimal? Porcentaje { get; set; }

        [m.Kontrol.Column()]
        decimal? PorcentajeTIF { get; set; }

        [m.Kontrol.Column()]
        decimal? PorcentajeTIM { get; set; }


        [m.Kontrol.Column()]
        int? NumeroPlazoPrimerPago { get; set; }


        [m.Kontrol.Column()]
        bool Modificable { get; set; }

        [m.Kontrol.Column()]
        int IdPlanPagos { get; set; }

        [m.Kontrol.Column()]
        int IdConceptoPago { get; set; }


        [m.Kontrol.Column()]
        int IdPeriodoPrimerPago { get; set; }


        [m.Kontrol.Column()]
        int IdFrecuenciaPago { get; set; }


        [m.Kontrol.Column()]
        bool Impresion { get; set; }


        [m.Kontrol.Column()]
        int? Orden { get; set; }


        [m.Kontrol.Column()]
        bool? Venta { get; set; }

        [m.Kontrol.Column()]
        bool? Reestructura { get; set; }

        [m.Kontrol.Column()]
        bool? Finiquito { get; set; }


        [m.Kontrol.Column()]
        string Formula { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }



        IConceptoPago ConceptoPago { get; set; }
        IItemGeneral FrecuenciaPago { get; set; }
        IPlanPagos PlanPagos { get; set; }
        IItemGeneral PeriodoPrimerPago { get; set; }


    }
}
