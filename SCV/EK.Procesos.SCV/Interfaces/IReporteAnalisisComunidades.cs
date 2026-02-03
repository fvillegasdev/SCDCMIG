using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ReporteAnalisisComunidades")]
    public interface IReporteAnalisisComunidades
         : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IReporteAnalisisComunidades>
    {
        Task<int> GuardarReporteAnalisisComunidad(Dictionary<string, object> parametros);
    }
}
