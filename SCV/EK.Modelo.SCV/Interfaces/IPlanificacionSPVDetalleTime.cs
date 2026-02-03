using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_PlanificacionDetalleTime")]
    public interface IPlanificacionSPVDetalleTime
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdPlanificacionDetalle { get; set; }
        [m.Kontrol.Column()]
        DateTime Fecha { get; set; }
        [m.Kontrol.Column()]
        DateTime HoraInicio { get; set; }
        [m.Kontrol.Column()]
        DateTime HoraFin { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("IdEstatus", true)]
        new string IdEstatus { get; set; }

        DateTime DTStart { get; set; }
        DateTime DTEnd { get; set; }
    }
}