using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;



namespace EK.Procesos.SGP.Interfaces
{
    [m.Kontrol.KontrolName("sgp_tareas")]
    public interface ITareas
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SGP.Interfaces.ITareas>
    {

        Task<m.SGP.Interfaces.IWBS[]> ActualizarSeguimiento(m.SGP.Interfaces.ITareas item);
        Task<List<m.SGP.Interfaces.ITareasDependencias>> GetTareasDependencias(Dictionary<string, object> parametros);
    }
}
