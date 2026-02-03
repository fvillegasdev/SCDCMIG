using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReportes
        : d.Kontrol.Interfaces.IDAOBase
    {
        Task<object[]> GetMonitoreoAgentes(Dictionary<string, object> parametros);
    }
}
