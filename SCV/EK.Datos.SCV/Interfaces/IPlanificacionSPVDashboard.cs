using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPlanificacionSPVDashboard
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPlanificacionSPVDashboard>
    {
        Task<List<m.SCV.Interfaces.IPlanificacionSPV>> GetRecursosProgramados(Dictionary<string, object> parametros);
    }
}