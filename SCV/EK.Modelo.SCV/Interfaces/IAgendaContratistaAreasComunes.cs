using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    public interface IAgendaContratistaAreasComunes
        : m.Kontrol.Interfaces.IAgenda
    {
        [m.Kontrol.Column("IdPlaza", true)]
        string IdPlaza { get; set; }
        List<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes> OrdenesTrabajo { get; set; }
    }
}
