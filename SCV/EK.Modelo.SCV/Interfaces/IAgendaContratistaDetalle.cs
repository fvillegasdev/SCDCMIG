using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("AgendaEntVivienda")]
    public interface IAgendaContratistaDetalle
        : m.Kontrol.Interfaces.IAgendaEntVivienda
    {
        int? IdCliente { get; set; }
        m.SCV.Interfaces.IClientesSPV Cliente { get; set; }

        [m.Kontrol.Column("IdFolio", true)]
        int IdFolio { get; set; }

        int? IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        int? IdOrdenTrabajo { get; set; }
        m.SCV.Interfaces.IOrdenTrabajoRUBA OrdenTrabajo { get; set; }

        List<m.SCV.Interfaces.IAgendaContratista> Reservas { get; set; }
    }
}