using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mo = EK.Modelo;
using d=EK.Datos;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IPeriodicidadDetalle:
                d.Kontrol.Interfaces.IDAOBaseGeneric<mo.Kontrol.Interfaces.IPeriodicidadDetalle>
    {
        Task<mo.Kontrol.Interfaces.IPeriodicidadDetalle> GetPeriodo(Dictionary<string, object> parametros);

    }
}
