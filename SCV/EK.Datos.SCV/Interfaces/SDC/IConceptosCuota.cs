using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SDC.Interfaces
{
    public interface IConceptosCuota
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SDC.Interfaces.IConceptosCuota>
    {
    }
}
