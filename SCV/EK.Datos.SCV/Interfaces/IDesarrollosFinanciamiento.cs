using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IDesarrollosFinanciamiento
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IDesarrollosFinanciamiento>
    {
        Task<List<m.SCV.Interfaces.IDesarrollosFinanciamiento>> GetAllDesarrollosFinanciamientos(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IDesarrollosFinanciamiento> GetDesarrolloFinanciamiento(int? idDesarrollo, int? idTipoFinanciamiento);
    }
}