using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReporteAnaliticoProspectos
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.IReporteAnaliticoProspectos>
    {
        Task<object> GetAllReporteAnaliticoProspectos(Dictionary<string, object> parametros);


    }
}
