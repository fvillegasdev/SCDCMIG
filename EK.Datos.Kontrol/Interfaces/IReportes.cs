using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IReportes
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IReporte>
    {
        Task DeleteCampos(int idReporte);
        Task DeleteFiltros(int idReporte);
        Task<List<m.Kontrol.Interfaces.IReporteCampo>> GetReporteCampos(int idReporte);
        Task<List<m.Kontrol.Interfaces.IReporteFiltro>> GetReporteFiltros(int idReporte);
    }
}
