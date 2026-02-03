using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mo = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [mo.Kontrol.Table("scv_ComisionesProcesos")]
    public interface IComisionesProceso:
        mo.Kontrol.Interfaces.IBaseKontrol
    {
        [mo.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [mo.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [mo.Kontrol.Column()]
        int? IdPeriodoDetalle { get; set; }

        [mo.Kontrol.Column()]
        DateTime FechaInicioProceso { get; set; }

        [mo.Kontrol.Column()]
        DateTime? FechaFinProceso { get; set; }


        [mo.Kontrol.Column()]
        DateTime FechaInicioPeriodo { get; set; }

        [mo.Kontrol.Column()]
        DateTime FechaFinPeriodo { get; set; }


    }
}
