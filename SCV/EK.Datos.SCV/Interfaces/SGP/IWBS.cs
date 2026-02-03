using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SGP.Interfaces
{
    public interface IWBS
        : dki.IDAOBaseGeneric<m.SGP.Interfaces.IWBS>
    {
        Task<m.SGP.Interfaces.IWBS[]> GetTreeConfiguration(Dictionary<string, object> parameters);

    }
}
