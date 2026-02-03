using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCO.Interfaces
{
    [m.Kontrol.Table("SCO_OrdenesCompraImpuestos")]
    public interface IOrdenesCompraImpuesto
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdOrdenCompra { get; set; }


        [m.Kontrol.Column()]
        int IdImpuesto { get; set; }

        [m.Kontrol.Column()]
        bool RetencionImpuesto { get; set; }


        [m.Kontrol.Column()]
        decimal? Importe { get; set; }

        [m.Kontrol.Column()]
        decimal? ImporteMoneda { get; set; }

        [m.Kontrol.Column()]
        int? IdMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal? TipoCambio { get; set; }



        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


    }
}
