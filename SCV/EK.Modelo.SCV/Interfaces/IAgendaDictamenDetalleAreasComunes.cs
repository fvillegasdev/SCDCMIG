using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("AgendaEntVivienda")]
    public interface IAgendaDictamenDetalleAreasComunes
        : m.Kontrol.Interfaces.IAgendaEntVivienda
    {
        int? IdCliente { get; set; }
        m.SCV.Interfaces.IClientesSPV Cliente { get; set; }

        [m.Kontrol.Column("IdFolio", true)]
        int IdFolio { get; set; }

        int? IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        int? IdDictamen { get; set; }
        m.SCV.Interfaces.IReporteAreasComunesDictamen Dictamen { get; set; }
    }
}
