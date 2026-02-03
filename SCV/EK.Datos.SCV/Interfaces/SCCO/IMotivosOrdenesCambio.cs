using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.Interfaces
{
    public interface IMotivosOrdenesCambio
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCCO.Interfaces.IMotivosOrdenesCambio>
    {
        Task<object> GetAllMotivosOrdenesCambio(Dictionary<string, object> parametros);
    }

}
