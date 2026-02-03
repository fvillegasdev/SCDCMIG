using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface ITareaInstance
        : IDAOBaseGeneric<m.Kontrol.Interfaces.ITareaInstancia>
    {
        Task<object[]> GetNotificadores(int idInstancia);
        Task<List<m.Kontrol.Interfaces.IUsuario>> GetAutorizadoresTarea(int idInstancia);

        //m.Kontrol.Interfaces.ITareaInstancia GetTaskInstanceByIdTask(int idTarea);

        //m.Kontrol.Interfaces.ITareaInstancia InsertTaskInstance(m.Kontrol.Interfaces.ITareaInstancia ti);

        //m.Kontrol.Interfaces.ITareaInstancia UpdateTaskInstance(m.Kontrol.Interfaces.ITareaInstancia ti);
    }
}
