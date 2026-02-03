using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCCO.Interfaces
{
    public interface ITipoNivelesPresupuesto
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCCO.Interfaces.ITipoNivelesPresupuesto>
    {
        Task<object> GetAllTipoNivelesPresupuesto(Dictionary<string, object> parametros);
    }

}
