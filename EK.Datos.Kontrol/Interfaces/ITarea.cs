using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface ITarea
        : IDAOBaseGeneric<m.Kontrol.Interfaces.ITarea>
    {
        //imodel.ITarea InsertTask(int idFlujo, imodel.ITarea task);

        //int UpdateTask(imodel.ITarea task);
        //int ChangeOrderTask(List<imodel.ITarea> tasks);

        //imodel.ITarea GetWorkflowTasksInfoNew(int idFlujo);

        //List<imodel.IItemGeneral> GetCommonDocuments(string search);
        //List<imodel.IItemGeneral> GetCommonDocuments();

        //imodel.ITarea DeleteTask(imodel.ITarea task);

        //List<imodel.ITareaAsignado> GetTaskAssignedByTask(int IdTarea);
        //List<imodel.ITareaAsignado> GetTaskAssignedByWorkflow(int IdFlujo);
        //List<imodel.IUsuario> GetUsersAssignedByTask(int IdTarea);
        //List<imodel.ITareaAsignado> GetPossibleAssignUsers(string search);
        //bool SaveTaskAssignedUser(int IdTarea, int AsignadoId, string Tipo);
        //bool DeleteTaskAssignedUser(int IdTarea);
    }
}
