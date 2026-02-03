using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Comision_PlanEsquema_Periodos")]
    public interface IComisionPlanEsquemaPeriodo : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdEsquema { get; set; }

        [m.Kontrol.Column()]
        int IdFase { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaInicio { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaFin { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        m.SCV.Interfaces.IFaseExpediente Fase { get; set; }
        m.SCV.Interfaces.IEsquema Esquema { get; set; }

    }
}