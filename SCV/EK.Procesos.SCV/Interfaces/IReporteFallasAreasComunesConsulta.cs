using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ConsultaReporteAreasComunes")]
    public interface IReporteFallasAreasComunesConsulta : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IReporteFallasAreasComunes>
    {
        Task<object[]> GetConsulta(Dictionary<string, object> filters);

    }
}
