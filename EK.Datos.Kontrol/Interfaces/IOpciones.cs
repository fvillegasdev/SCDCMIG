using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IOpciones
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IOpcionModulo>
    {
        Task<List<m.Kontrol.Interfaces.IOpcionModulo>> GetDashBoards(Dictionary<string, object> parametros);
    }
}
