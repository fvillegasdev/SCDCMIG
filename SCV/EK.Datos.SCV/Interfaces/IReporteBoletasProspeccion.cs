using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReporteBoletasProspeccion
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.IReporteBoletasProspeccion>
    {
        Task<object> GetAllReporteBoletasProspeccion(Dictionary<string, object> parametros);


    }
}
