using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IWorkflowManager
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IBaseKontrol>
    {
        Task<object[]> GetAssignedTasks(int idUser);
        Task<m.Kontrol.Interfaces.IWorkflow> GetWorkflow(string clave);
        Task<m.Kontrol.Interfaces.IWorkflow> GetWorkflow(int id);
        Task<List<m.Kontrol.Interfaces.ITarea>> GetWorkflowTasks(int idWorkflow);


        //Task<m.Kontrol.Interfaces.IWorkflowInstance> SaveWorkflowInstance(m.Kontrol.Interfaces.IWorkflowInstance instance);
        //Task<m.Kontrol.Interfaces.ITareaInstancia> SaveWorkflowInstanceTask(m.Kontrol.Interfaces.ITareaInstancia instance);
    }
}
