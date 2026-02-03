using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCO.Interfaces
{
    [m.Kontrol.Table("SCO_OrdenesCompra")]
    public interface IOrdenesCompra
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdCategoria { get; set; }

        [m.Kontrol.Column()]
        int IdUsuario { get; set; }

        [m.Kontrol.Column()]
        int IdCompania { get; set; }

        [m.Kontrol.Column()]
        int IdCentroCosto { get; set; }


        [m.Kontrol.Column()]
        decimal Importe { get; set; }

        [m.Kontrol.Column()]
        decimal? ImporteMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal? Total { get; set; }

        [m.Kontrol.Column()]
        decimal? TotalMoneda { get; set; }


        [m.Kontrol.Column()]
        int IdOrigen { get; set; }

        [m.Kontrol.Column()]
        int IdTipoEntidad { get; set; }



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
