using System.Threading.Tasks;
using m = EK.Modelo;
using System;
using im = EK.Modelo.Kontrol.Interfaces;
using System.Collections.Generic;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IModulos
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IModulo>
    {

        Task<im.IOpcionModulo[]> GetOpciones(Dictionary<string, object> parametros);

        Task<object[]> GetAccionesPorOpcion(string clave);

    }
}