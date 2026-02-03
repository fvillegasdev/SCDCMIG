using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("flujoAutorizacion")]
    public interface IWorkflow
        : IBaseProceso
    {
        #region "WORKFLOW"
        //Task<List<modelo.IWorkflow>> GetWorkflowsList(int idTipo);
        //Task<List<modelo.IWorkflow>> GetWorkflowsByIdUser();
        //Task<modelo.IWorkflow> GetWorkflowById(int Id);
        //Task<modelo.IWorkflow> GetWorkflowByKey(string TypeKey);
        //Task<List<modelo.ITarea>> GetTasksByWorkflow(int idFlujo,bool Editar);
        //List<modelo.INotificador> GetNotifiersByWorkflow(int idFlujo);
        //List<modelo.INotificador> GetPossibleNotificators(string search);
        //bool SaveNotifierWorkflow(int FlujoId, int NotificadorId, string Tipo);
        //bool DeleteNotifierWorkflow(int FlujoId);
        //modelo.ITarea GetWorkflowTasksById(int idTarea);
        //Task<object[]> GetHistory(int top);
        //Task<object[]> GetHistory(int ID, int top);

        Task<List<m.Kontrol.Interfaces.IWorkflow>> GetWorkflowByTipo(string ClaveTipo);

        Task<List<m.Kontrol.Interfaces.IWorkflow>> GetFlujoTrabajo(Dictionary<string, object> parametros);


        //Task<modelo.IWorkflow> Save(modelo.IWorkflow workflow);
        #endregion
    }
}
