using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;



namespace EK.Procesos.SGP.Interfaces
{
    [m.Kontrol.KontrolName("WBS")]
    public interface IWBS 
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SGP.Interfaces.IWBS>
    {
        Task<m.SGP.Interfaces.IWBS[]> SaveWBS(m.SGP.Interfaces.IWBS item);
        Task<m.SGP.Interfaces.IWBS[]> DeleteWBSById(Dictionary<string, object> parametros);

        Task<m.SGP.Interfaces.IWBS[]> GetTreeConfiguration(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.ICalendar> GetCalendarWBS(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.IGantt> GetGanttWBS(Dictionary<string, object> parametros);
        Task<m.SGP.Interfaces.IWBS[]> GetTreeTask(Dictionary<string, object> parametros);
    }
}
