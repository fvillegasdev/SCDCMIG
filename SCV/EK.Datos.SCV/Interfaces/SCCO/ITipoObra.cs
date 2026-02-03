using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.Interfaces
{
    public interface ITipoObra
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCCO.Interfaces.ITipoObra>
    {
        Task<object> GetAllTipoObra(Dictionary<string, object> parametros);
    }

}
