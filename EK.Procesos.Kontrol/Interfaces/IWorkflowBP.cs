using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol.Interfaces
{
    public interface IWorkflowBP
    {
        string EntityName { get; }
        Task<string> GetDescripcion(dynamic obj);
        Task<WorkflowResult> Authorize(int id, Modelo.Kontrol.Interfaces.IWorkflowInstance instance);
        Task<WorkflowResult> Reject(int id, Modelo.Kontrol.Interfaces.IWorkflowInstance instance);
    }
}