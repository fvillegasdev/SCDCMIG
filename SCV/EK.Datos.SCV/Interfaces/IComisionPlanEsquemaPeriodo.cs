using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d=EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
     public  interface IComisionPlanEsquemaPeriodo : d.Kontrol.Interfaces.IDAOBaseGeneric
        <m.SCV.Interfaces.IComisionPlanEsquemaPeriodo>
    {
        Task<object> GetAllPlanEsquema(Dictionary<string, object> parameters);
    }
}
