using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("WorkflowManager")]    
    public interface IWorkflowManager 
        : IBaseProceso
    {
        Task<m.Kontrol.Interfaces.IWorkflowInstance> Start(int id, m.Kontrol.Interfaces.IBaseKontrol entidad, int idUserOwner);
        Task<m.Kontrol.Interfaces.IWorkflowInstance> Start(string clavePlantilla, m.Kontrol.Interfaces.IBaseKontrol entidad, int idUserOwner);
        Task<m.Kontrol.Interfaces.ITareaInstancia> GetAssignedTask(int id);
        Task<object[]> GetAssignedTasks();
        Task<object> GetAssignedTasks(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IWorkflowInstance>> GetInstances(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IWorkflowInstance>> GetUserInstances(Dictionary<string, object> parametros);
        Task<m.Kontrol.Interfaces.ITareaInstancia> TaskApproval(m.Kontrol.Interfaces.ITareaInstancia tarea);
    }
}