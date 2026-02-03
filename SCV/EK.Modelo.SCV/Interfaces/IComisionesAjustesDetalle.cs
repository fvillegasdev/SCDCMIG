using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mo = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [mo.Kontrol.Table("scv_ComisionesAjustesDetalle")]
    public interface IComisionesAjustesDetalle :
        mo.Kontrol.Interfaces.IBaseKontrol
    {

        [mo.Kontrol.Column()]
        int IdComisionAjuste { get; set; }

        [mo.Kontrol.Column()]
        int NumeroParcialidad { get; set; }

        [mo.Kontrol.Column()]
        DateTime FechaAplicacion { get; set; }

        [mo.Kontrol.Column()]
        decimal Monto { get; set; }

        [mo.Kontrol.Column()]
        decimal MontoMoneda { get; set; }


        [mo.Kontrol.Column()]
        int IdMoneda { get; set; }

        [mo.Kontrol.Column()]
        decimal TipoCambio { get; set; }


        [mo.Kontrol.Column()]
        decimal? ImporteAplicado { get; set; }

        [mo.Kontrol.Column()]
        decimal? ImportePorAplicar { get; set; }


        [mo.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [mo.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        mo.Kontrol.Interfaces.IMoneda Moneda { get; set; }
    }
}
