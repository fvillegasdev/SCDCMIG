using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCO.Interfaces
{
    [m.Kontrol.Table("SCO_OrdenesCompraDetalle")]
    public interface IOrdenesCompraDetalle
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdOrdenCompra { get; set; }


        [m.Kontrol.Column()]
        int IdTmComision { get; set; }


        [m.Kontrol.Column()]
        int IdInsumo { get; set; }

        [m.Kontrol.Column()]
        int IdTmComisionOrdenCompra { get; set; }


        [m.Kontrol.Column()]
        decimal? Comision { get; set; }

        [m.Kontrol.Column()]
        decimal? ComisionMoneda { get; set; }


        [m.Kontrol.Column()]
        int Cantidad { get; set; }


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
