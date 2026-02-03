using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IInterfaceDetalle
       : m.Kontrol.Interfaces.IBaseKontrol
    {
        /*General*/
        [m.Kontrol.Column()]
        int? IdExpediente { get; set; }
        [m.Kontrol.Column()]
        int? IdCliente { get; set; }
        [m.Kontrol.Column()]
        int? IdVenta { get; set; }
        [m.Kontrol.Column()]
        int? Clienteek10 { get; set; }
        string IdInterface { get; set; }
        string EstatusInterface { get; set; }

        /*Cliente*/
        [m.Kontrol.Column()]
        string claveCompania { get; set; }
        [m.Kontrol.Column()]
        string direccion { get; set; }
        [m.Kontrol.Column()]
        int? numcte_ek { get; set; }
        [m.Kontrol.Column()]
        string EstatusRegistro { get; set; }


        /*Poliza*/
        [m.Kontrol.Column()]
        string Segmento { get; set; }
        [m.Kontrol.Column()]
        string CentroCosto { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaOperacion { get; set; }
        [m.Kontrol.Column()]
        float? TC { get; set; }
        [m.Kontrol.Column()]
        int? inst_credito { get; set; }
        [m.Kontrol.Column()]
        int? Monto_Escrituracion { get; set; }
        [m.Kontrol.Column()]
        string InstitutoCredito { get; set; }
        [m.Kontrol.Column()]
        string TipoProceso { get; set; }

        /*Finiquito*/
        [m.Kontrol.Column()]
        int? Monto_Credito { get; set; }
        [m.Kontrol.Column()]
        int? inst_credito2 { get; set; }
        [m.Kontrol.Column()]
        int? Monto_Credito2 { get; set; }


        /*PlanPagos*/
        [m.Kontrol.Column()]
        int? FacturaCapital { get; set; }
        [m.Kontrol.Column()]
        int? NumConceptoPago { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaVencimiento { get; set; }
        [m.Kontrol.Column()]
        float? ValorCapital { get; set; }


        /*Reestructura*/
        [m.Kontrol.Column()]
        DateTime? Fecha_Reestructura { get; set; }

        
    }
}
