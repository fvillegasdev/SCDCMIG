using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCP.Interfaces
{
    [m.Kontrol.KontrolName("Proveedores")]

    public interface IProveedores
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCP.Interfaces.IProveedor>
    {
        Task<List<m.SCP.Interfaces.IProveedorContactos>> GetProveedorContactos(Dictionary<string, object> parametros);
        Task<m.SCP.Interfaces.IProveedorContactos> GetProveedorContactoById(int id);
        Task<m.SCP.Interfaces.IProveedorActaConstitutiva> GetProveedorActaConstitutivaById(int id);
        Task<m.SCP.Interfaces.IProveedorRegistroPublicoPropiedad> GetProveedorPublicoPropiedadById(int id);
        Task<List<m.SCP.Interfaces.IProveedorActaConstitutiva>> GetProveedorActasConstitutivas(Dictionary<string, object> parametros);
        Task<List<m.SCP.Interfaces.IProveedorRegistroPublicoPropiedad>> GetProveedorRegistroPublicos(Dictionary<string, object> parametros);
    }

}