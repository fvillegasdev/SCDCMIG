using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("DashBoardExpedientes")]
    public interface IDashBoardExpedientes : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object> GetDashboardEtapas(Dictionary<string, object> parametros);
        Task<object> GetDashboardFases(Dictionary<string, object> parametros);
        Task<object> GetDashboardClientes(Dictionary<string, object> parametros);
        Task<object> GetDashboardExpedientes(Dictionary<string, object> parametros);
        Task<object> GetDashboardMap(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetEtapasDashBoard(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetEstados(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetFases(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetTopGraficaEtapas(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetTopGraficaDesarrollos(Dictionary<string, object> parametros);       
    }
}