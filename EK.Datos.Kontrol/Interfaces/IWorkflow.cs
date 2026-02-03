using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IWorkflow
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IWorkflow>
    {
        //Task<List<imodel.IWorkflow>> GetWorkflowsList(int idTipo);
        //Task<List<imodel.IWorkflow>> GetWorkflowsByIdUser(int IdUser);
        //Task<imodel.IWorkflow> GetWorkflowById(int Id);

        Task<List<m.Kontrol.Interfaces.IWorkflow>> GetWorkflowByTipo(string ClaveTipo);
        Task<List<m.Kontrol.Interfaces.IWorkflow>> GetFlujoTrabajo(Dictionary<string, object> parametros);



        //Task<imodel.IWorkflow> GetWorkflowByKey(string TypeKey);

        //Task<List<imodel.ITarea>> GetTasksByWorkflow(int idFlujo);

        //Task<int> SaveWorkflow(imodel.IWorkflow wf);

        //Task<int> SaveTarea(int idWorkflow, imodel.ITarea tarea);

        //Task<int> SaveRegla(int idTarea, imodel.IReglaTarea regla);

        //Task<int> DeleteTarea(int idTarea);

        //Task<int> DeleteRegla(int idRegla);
        //List<imodel.INotificador> GetNotifiersByWorkflow(int idFlujo);

        //List<imodel.IUsuario> GetUsersNotifiersByWorkflow(int idFlujo);

        //List<imodel.INotificador> GetPossibleNotificators(string search);

        //bool SaveNotifierWorkflow(int FlujoId, int NotificadorId, string Tipo);

        //bool DeleteNotifierWorkflow(int FlujoId);



        //imodel.ITarea GetWorkflowTasksById(int idTarea);
    }
}
