using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.Interfaces
{
    public interface ITipoMovimientoProveedores
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCP.Interfaces.ITipoMovimientoProveedor>
    {
        Task<object> GetAllTipoMovimientoProveedores(Dictionary<string, object> parametros);
    }

}
