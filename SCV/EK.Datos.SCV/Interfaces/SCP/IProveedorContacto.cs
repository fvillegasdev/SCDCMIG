using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCP.Interfaces
{
    public interface IProveedorContacto
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCP.Interfaces.IProveedorContactos>
    {
      Task<m.SCP.Interfaces.IProveedorContactos> ObtenerContactoPrincipal(int idProveedor, string claveContacto);
    }
}
