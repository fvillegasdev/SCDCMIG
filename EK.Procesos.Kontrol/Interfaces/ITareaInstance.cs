using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using modelo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("TaskInstance")]
    public interface ITareaInstance : IBaseProceso
    {

        //ITareaInstancia GetTaskInstanceByIdTask(int idTareaInstancia);
        //List<ITareaInstanciaDocumentos> GetDocumentsByTaskInstance(int idTareaInstancia);

        //Task<ITareaInstancia> InsertTaskInstance(string FormJson);

        //Task<ITareaInstancia> UpdateTaskInstance(string FormJson);

        //Task<List<ITareaInstanciaDocumentos>> InsertDocumentsTaskInstance(string FormJson);

        //Task<List<ITareaInstanciaDocumentos>> DeleteDocumentsTaskInstance(string FormJson);
        //Task<object[]> GetHistory(int top);
        //Task<object[]> GetHistory(int ID, int top);

        //#region MisTareas
        //List<modelo.ITareaInstancia> GetMyTasks(int TipoConsulta);
        //#endregion

        Task<List<ITareaInstancia>> obtenerTareasInstancia(Dictionary<string, object> parametros);
    }
}
