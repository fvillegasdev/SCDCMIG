using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.Interfaces
{
    public interface IImpuestos:
        d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IImpuestos>
    {
        Task<object> GetAllImpuestos(Dictionary<string,object>parametros);

    }
}
