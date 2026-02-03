using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReporteExpedientes
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.IReporteExpedientes>
    {
        Task<object> GetAllReporteExpedientes(Dictionary<string, object> parametros);
    }
}
