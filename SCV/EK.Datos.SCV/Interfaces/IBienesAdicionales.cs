using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IBienesAdicionales
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IBienesAdicionales>
    {
        Task<List<m.SCV.Interfaces.IBienesAdicionales>> GetBienesAdicionales(string fracc);
    }
}
