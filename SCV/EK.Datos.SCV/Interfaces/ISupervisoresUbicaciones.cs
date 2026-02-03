using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface ISupervisoresUbicaciones
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ISupervisorUbicacion>
    {
        Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getSupervisoresFraccionamientos(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getUbicacionesFraccionamientos(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> saveSupervisoresUbicaciones(Dictionary<string, object> parametros);


    }
}