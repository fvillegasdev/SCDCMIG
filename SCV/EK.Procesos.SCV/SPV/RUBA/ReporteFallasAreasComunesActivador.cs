
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
namespace EK.Procesos.SCV
{
    public class ReporteFallasAreasComunesActivador : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteFallasAreasComunes, d.SCV.Interfaces.IReporteFallasAreasComunes>, p.SCV.Interfaces.IReporteFallasAreasComunesActualizador
    {
        public ReporteFallasAreasComunesActivador(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteFallasAreasComunes dao)
        : base(factory, dao, "ReporteFallasAreasComunesAct")
        {

        }
        public override async Task<m.SCV.Interfaces.IReporteFallasAreasComunes> Save(m.SCV.Interfaces.IReporteFallasAreasComunes item)
        {
            var bpREP = Get<p.SCV.Interfaces.IReporteFallasAreasComunes>();
            return await bpREP.ReverseReporteFallas(item);
        }
    }
}
