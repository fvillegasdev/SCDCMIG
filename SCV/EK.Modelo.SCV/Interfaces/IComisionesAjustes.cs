using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mo = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [mo.Kontrol.Table("scv_ComisionesAjustes")]
    public interface IComisionesAjustes :
        mo.Kontrol.Interfaces.IBaseKontrol
    {

        [mo.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [mo.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }



        [mo.Kontrol.Column()]
        int IdTipoComision { get; set; }


        [mo.Kontrol.Column()]
        int? IdTipoComisionComplementaria { get; set; }


        [mo.Kontrol.Column()]
        int IdUsuario { get; set; }


        [mo.Kontrol.Column()]
        decimal ImporteComision { get; set; }


        [mo.Kontrol.Column()]
        decimal ImporteComisionMoneda { get; set; }


        [mo.Kontrol.Column()]
        decimal? TipoCambio { get; set; }


        [mo.Kontrol.Column()]
        decimal ImportePorAplicar { get; set; }

        [mo.Kontrol.Column()]
        decimal ImporteAplicado { get; set; }


        [mo.Kontrol.Column()]
        int IdMoneda { get; set; }


        [mo.Kontrol.Column()]
        int? IdPeriodicidad { get; set; }


        [mo.Kontrol.Column()]
        int? NumeroParcialidades { get; set; }


        [mo.Kontrol.Column()]
        int IdDesarrollo { get; set; }


        [mo.Kontrol.Column()]
        DateTime? FechaAplicacionCargo{ get; set; }


        [mo.Kontrol.Column()]
        DateTime? FechaAplicacionAbono { get; set; }

        mo.SCV.Interfaces.IAgente Usuario { get; set; }
        mo.Kontrol.Interfaces.IMoneda Moneda { get; set; }

        mo.SCV.Interfaces.ITmComisiones TipoComision { get; set; }
        mo.SCV.Interfaces.ITmComisiones TipoComisionComplementaria { get; set; }



        mo.Kontrol.Interfaces.IPeriodicidad Periodicidad { get; set; }

        mo.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }




    }
}
