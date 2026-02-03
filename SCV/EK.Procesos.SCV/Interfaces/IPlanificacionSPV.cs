using m = EK.Modelo;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("PlanificacionSPV")]
    public interface IPlanificacionSPV
        : m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPlanificacionSPV>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetPlanificacionSPVDetalle(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetViewPrincipalActs(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetViewActsDet(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.ICalendar> GetPlanificacionCalendar(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IPlanificacionSPV>> GetRecursosProgramados(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IPlanificacionSPVDetalle> SaveAtencion(m.SCV.Interfaces.IPlanificacionSPVDetalle item);

    }
}