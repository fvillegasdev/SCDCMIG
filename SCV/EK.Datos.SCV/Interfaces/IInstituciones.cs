using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IInstituciones
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IInstitucion>
    {
        Task<List<m.SCV.Interfaces.ITipoFinanciamientoInstitucion>> GetAllTFInstituciones(Dictionary<string, object> parametros);
    }
}