using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Contratistas")]
    public interface IContratistas
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IContratista>
    {
        Task<List<m.SCV.Interfaces.IAgendaContratistaDetalle>> GetOrdenesTrabajo(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>> GetOrdenesTrabajoAreasComunes(Dictionary<string, object> parametros);

    }
}