using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IWorkflowInstance
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.Kontrol.Interfaces.IWorkflowInstance>
    {
        Task<string> GetReferencia(int idInstancia);
        Task<object[]> GetNotificadores(int idInstancia);
        Task<List<m.Kontrol.Interfaces.IUsuario>> GetUsuariosPropietarios(Dictionary<string, object> parametros);

    }
}
