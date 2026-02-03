using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReporteProspectosClientes
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.IReporteProspectosClientes>
    {
        Task<object> GetAllReporteProspectosClientes(Dictionary<string, object> parametros);


    }
}
