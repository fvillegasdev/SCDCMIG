using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.Interfaces
{
    public interface IProveedores
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCP.Interfaces.IProveedor>
    {
        Task<object> GetAllProveedores(Dictionary<string, object> parametros);
        Task<List<m.SCP.Interfaces.IProveedorActaConstitutiva>> GetProveedorActasConstitutivas(int id);
    }

}
