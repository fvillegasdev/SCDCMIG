using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReporteConsultaProspectos
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.IReporteConsultaProspectos>
    {
        Task<object> GetAllReporteConsultaProspectos(Dictionary<string, object> parametros);


    }
    
}
