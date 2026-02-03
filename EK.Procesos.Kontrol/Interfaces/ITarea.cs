using System;
using System.Collections.Generic;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("Tareas")]
    public interface ITarea 
        : IBaseProceso
    {
        //Task<modelo.ITarea> InsertTask(string FormJson);
        //Task<modelo.ITarea> UpdateTask(string FormJson);
        //List<modelo.ITarea> ChangeOrderTask(List<modelo.ITarea> tasks);
        //modelo.ITarea GetWorkflowTasksInfoNew(int idFlujo);
        //Task<int> DeleteTask(string FormJson);

        //Task<object[]> GetHistory(int top);
        //Task<object[]> GetHistory(int ID, int top);

        //List<modelo.ITareaAsignado> GetTaskAssignedByTask(int IdTarea);
        //List<modelo.IUsuario> GetUsersAssignedByTask(int IdTarea);
        //List<modelo.ITareaAsignado> GetPossibleAssignUsers(string search);
        //bool SaveTaskAssignedUser(int IdTarea, int AsignadoId, string Tipo);
        //bool DeleteTaskAssignedUser(int IdTarea);
    }
}
