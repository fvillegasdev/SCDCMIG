using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ReporteFallasAreasComunesAct")]
    public interface IReporteFallasAreasComunesActualizador : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IReporteFallasAreasComunes>
    {
    }
}
