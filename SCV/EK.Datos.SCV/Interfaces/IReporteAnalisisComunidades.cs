using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IReporteAnalisisComunidades
          : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IReporteAnalisisComunidades>
    {
        Task<int> SaveReporte(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IReporteAnalisisComunidades> getCuentasForAnalisis(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteAnalisisComunidades>> getConsultaReporteAnalisis(Dictionary<string, object> parametros);
    }
}
