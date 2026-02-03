using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.Interfaces
{
    public interface IProveedoresActasConstitutivas
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCP.Interfaces.IProveedorActaConstitutiva>
    {
        Task<object> GetAllProveedoresActasConstitutivas(Dictionary<string, object> parametros);
    }

}
