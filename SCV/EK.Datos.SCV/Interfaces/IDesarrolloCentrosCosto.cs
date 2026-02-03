using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IDesarrollosCentrosCosto
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IDesarrolloCentrosCosto>
    {
        Task<object[]> GetAllDesarrollosCentrosCosto(Dictionary<string, object> parametros);

    }
}
