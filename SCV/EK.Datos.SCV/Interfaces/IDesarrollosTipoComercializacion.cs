using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IDesarrollosTiposComercializacion
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IDesarrolloTiposComercializacion>
    {
        Task<object[]> GetDesarrollosTiposComercializacion(Dictionary<string, object> parametros);
        //Task<IDesarrolloTiposComercializacion> GetDesarrollosTiposComercializacion(int? idDesarrollo, int? idTiposComercializacion);
    }
}
