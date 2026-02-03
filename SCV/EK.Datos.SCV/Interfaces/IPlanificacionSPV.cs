using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPlanificacionSPV
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPlanificacionSPV>
    {
        //Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetPlanificacionDetalle(int IdPlanificacion);
    }
}