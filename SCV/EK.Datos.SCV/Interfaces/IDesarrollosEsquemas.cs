using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IDesarrollosEsquemas
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IDesarrolloEsquema>
    {
        Task<object[]> GetAllDesarrollosEsquemas(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IDesarrolloEsquema> GetDesarrolloEsquema(int? idDesarrollo, int? idEsquema);
    }
}