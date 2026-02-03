using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ReportesFallasConsulta")]
    public interface IReportesFallasConsulta
          : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IReporteFalla>
    {
        Task<object[]> GetConsulta(m.SCV.Interfaces.IReporteFallaConsulta filters);
    }
}