using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IEntidades
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IEntidad>
    {
        Task<List<m.Kontrol.Interfaces.IEntidadCampo>> GetCamposEntidad(string clave);
    }
}
