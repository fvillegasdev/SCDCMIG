using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.Interfaces
{
    public interface IProveedoresRegistroPublicoPropiedad
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCP.Interfaces.IProveedorRegistroPublicoPropiedad>
    {
        Task<object> GetAllProveedoresRegistroPublicoPropiedad(Dictionary<string, object> parametros);
    }

}
