using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IDesarrollosPrototipo
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IDesarrolloPrototipo>
    {
        Task<object[]> GetAllDesarrollosPrototipos(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IDesarrolloPrototipo> ObtenerPrototipoPorDesarrollo(int idDesarrollo, int idPrototipo);

    }
}
