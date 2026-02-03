using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("Agenda")]
    public interface IAgendaDictamen
        : m.Kontrol.Interfaces.IAgenda
    {
        [m.Kontrol.Column("IdPlaza", true)]
        string IdPlaza { get; set; }
        List<m.SCV.Interfaces.IAgendaDictamenDetalle> Dictamenes { get; set; }
    }
}