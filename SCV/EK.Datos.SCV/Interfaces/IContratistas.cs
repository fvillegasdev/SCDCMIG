using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IContratistas
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IContratista>
    {
        Task<List<m.SCV.Interfaces.IAgendaContratistaDetalle>> GetOrdenesTrabajo(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>> GetOrdenesTrabajoAreasComunes(Dictionary<string, object> parametros);

    }
}