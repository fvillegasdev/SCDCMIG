using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ContratistasUbicaciones")]
    public interface IContratistasUbicaciones
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IContratistaUbicacion>
    {
        Task<m.SCV.Interfaces.IContratista> GetContratistaDefault(int idUbicacion);
    }
}