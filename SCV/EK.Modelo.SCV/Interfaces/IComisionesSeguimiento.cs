using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ComisionesSeguimiento")]
    public interface IComisionesSeguimiento
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdPeriodoDetalle { get; set; }

        [m.Kontrol.Column()]
        int IdExpediente { get; set; }

        [m.Kontrol.Column()]
        int IdCategoria { get; set; }

        [m.Kontrol.Column()]
        int IdUsuario { get; set; }

        [m.Kontrol.Column()]
        decimal? Porcentaje { get; set; }

        [m.Kontrol.Column()]
        decimal? Monto { get; set; }

        [m.Kontrol.Column()]
        decimal? ValorComisionable { get; set; }

        [m.Kontrol.Column()]
        decimal? ValorComisionableMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal? Comision { get; set; }

        [m.Kontrol.Column()]
        decimal? ComisionMoneda { get; set; }

        [m.Kontrol.Column()]
        int? IdMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal? TipoCambio { get; set; }



        [m.Kontrol.Column()]
        int? IdVentaUbicacion { get; set; }


        [m.Kontrol.Column()]
        DateTime FechaCalculo { get; set; }


        [m.Kontrol.Column()]
        int IdProceso { get; set; }

        [m.Kontrol.Column()]
        int IdTipo { get; set; }

        [m.Kontrol.Column()]
        int? IdComisionPadre { get; set; }


        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }


    }
}
