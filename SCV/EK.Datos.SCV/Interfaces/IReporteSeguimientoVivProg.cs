using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReporteSeguimientoVivProg
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IReporteSeguimientoVivProg>
    {
        Task<List<m.SCV.Interfaces.IReporteSeguimientoVivProg>> GetReporteSeguimiento(Dictionary<string, object> parametros);

    }
}
