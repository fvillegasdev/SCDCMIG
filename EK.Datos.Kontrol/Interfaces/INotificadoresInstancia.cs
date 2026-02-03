using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface INotificadoresInstancia : IDAOBaseGeneric<m.Kontrol.Interfaces.INotificadoresInstancia>
    {
        Task<List<m.Kontrol.Interfaces.IUsuario>> obtenerUsuariosAutorizadoresTareaInstancia(Dictionary<string, object> parametros);
        Task<object> GetUsersByTaskInstance(Dictionary<string, object> parametros);
    }
}
