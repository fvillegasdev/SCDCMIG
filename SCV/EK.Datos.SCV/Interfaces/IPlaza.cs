using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPlaza
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPlaza>
    {
        Task<List<m.Kontrol.Interfaces.IUsuario>> getGerentes(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IUsuario>> getCatByClaveUbicacion(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IUsuario>> getUserByOrdenTrabajoID(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IPlaza>> getPlazasClasificadores(Dictionary<string, object> parametros);
        
    }
}
