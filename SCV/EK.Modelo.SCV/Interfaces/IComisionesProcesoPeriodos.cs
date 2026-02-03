using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mo = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [mo.Kontrol.Table("scv_ComisionesProcesosPeriodos")]
    public interface IComisionesProcesoPeriodos:
        mo.Kontrol.Interfaces.IBaseKontrol
    {
        [mo.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [mo.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [mo.Kontrol.Column()]
        int IdComisionProceso { get; set; }

        [mo.Kontrol.Column()]
        int IdPeriodicidad { get; set; }

        [mo.Kontrol.Column()]
        DateTime FechaInicioProceso { get; set; }

        [mo.Kontrol.Column()]
        DateTime? FechaFinProceso { get; set; }


        [mo.Kontrol.Column()]
        int IdTabulador { get; set; }


        [mo.Kontrol.Column()]
        string ClaveTabulador { get; set; }

        [mo.Kontrol.Column()]
        int? IdPlaza { get; set; }

        [mo.Kontrol.Column()]
        int? IdDesarrollo { get; set; }


    }
}
