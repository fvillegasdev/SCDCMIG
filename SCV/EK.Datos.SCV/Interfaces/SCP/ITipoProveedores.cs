using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.Interfaces
{
    public interface ITipoProveedores
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCP.Interfaces.ITipoProveedor>
    {
        Task<object> GetAllTipoProveedores(Dictionary<string, object> parametros);
    }

}
