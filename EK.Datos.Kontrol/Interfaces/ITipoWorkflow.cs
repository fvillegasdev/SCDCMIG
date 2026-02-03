using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface ITipoWorkflow
        : IDAOBaseGeneric<m.Kontrol.Interfaces.ITipoWorkflow>
    {
        Task<object> GetBPType(int id);
    }
}
