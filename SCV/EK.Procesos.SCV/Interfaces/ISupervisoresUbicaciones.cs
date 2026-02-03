using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("SupervisoresUbicaciones")]

    public interface ISupervisoresUbicaciones
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ISupervisorUbicacion>
    {
        Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getSupervisoresFraccionamientos(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getUbicacionesFraccionamientos(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getSupervisores(Dictionary<string, object> parametros);
    }
}