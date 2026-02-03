using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using miSCV = EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.Interfaces
{
    public interface ITramiteAsignado
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ITramiteAsignado>
    {
        //Task<List<miSCV.ITramiteAsignadoConfiguracion>> GetTramites(Dictionary<string, object> parametros);
    }
}
