using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("AgendaEntVivienda")]
    public interface IAgendaContratistaDetalleAreasComunes
        : m.Kontrol.Interfaces.IAgendaEntVivienda
    {
        int? IdCliente { get; set; }
        m.SCV.Interfaces.IClientesSPV Cliente { get; set; }

        int? IdUsuario { get; set; }
        m.Kontrol.Interfaces.IUsuarioKontrol Usuario { get; set; }

        [m.Kontrol.Column("IdFolio", true)]
        int IdFolio { get; set; }

        [m.Kontrol.Column("UsuarioReporta", true)]
        string UsuarioReporta { get; set; }

        int? IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        string IdPlaza { get; set; }

        int? IdOrdenTrabajo { get; set; }
        m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes OrdenTrabajo { get; set; }

        List<m.SCV.Interfaces.IAgendaContratistaAreasComunes> Reservas { get; set; }
    }
}
