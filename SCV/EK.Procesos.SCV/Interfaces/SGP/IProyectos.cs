using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;



namespace EK.Procesos.SGP.Interfaces
{
    [m.Kontrol.KontrolName("Proyectos")]
    public interface IProyectos 
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SGP.Interfaces.IProyectos>
    {
        Task<List<m.SGP.Interfaces.IColaboradores>> GetColaboradores(Dictionary<string, object> parametros);

        Task<List<m.SGP.Interfaces.IColaboradores>> GetResourceAssignedTask(Dictionary<string, object> parametros);
    }
}
