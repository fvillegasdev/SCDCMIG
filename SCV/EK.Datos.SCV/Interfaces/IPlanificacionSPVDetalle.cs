using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPlanificacionSPVDetalle
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPlanificacionSPVDetalle>
    {
        Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetViewPrincipalActs(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetViewActsDet(Dictionary<string, object> parametros);

    }
}