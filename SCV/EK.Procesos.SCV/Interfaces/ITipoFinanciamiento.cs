using m = EK.Modelo;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("TipoFinanciamiento")]

    public interface ITipoFinanciamiento
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ITipoFinanciamiento>
    {
        Task<List<m.SCV.Interfaces.ITipoFinanciamientoInstitucion>> GetAllTFInstituciones(Dictionary<string, object> parametros);
        //Task<List<m.SCV.Interfaces.ITipoFinanciamiento>> GetDesarrolloFinanciamientos(Dictionary<string, object> parametros);
    }
}