using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Comision_PlanEsquema_Periodos_Detalles")]
    public interface IComisionPlanEsquemaPeriodoDetalle : IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; } 

        [m.Kontrol.Column()]
        int IdPlanEsquemaPeriodo { get; set; }

        [m.Kontrol.Column()]
        int IdCategoriaAgente { get; set; }

        [m.Kontrol.Column()]
        int IdEtapa { get; set; }

        [m.Kontrol.Column()]
        int IdTmComision { get; set; }

        [m.Kontrol.Column()]
        decimal Porcentaje { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        int IdFechaComision { get; set; }

        string TMNombre { get; set; }

        ITmComisiones TMComision { get; set; }
        IFechaComision FechaComision { get; set; }
        IPuesto Puesto { get; set; }

    }
}