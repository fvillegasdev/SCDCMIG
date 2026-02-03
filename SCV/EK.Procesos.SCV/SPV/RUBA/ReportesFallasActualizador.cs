using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;

namespace EK.Procesos.SCV
{
    public class ReportesFallasActualizador : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteFalla, d.SCV.Interfaces.IReportesFallas>,
        p.SCV.Interfaces.IReportesFallasActualizador
    {
        public ReportesFallasActualizador(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReportesFallas dao)
            : base(factory, dao, "reportesFallasActualizador")
        {
        }

        public override async Task<m.SCV.Interfaces.IReporteFalla> Save(m.SCV.Interfaces.IReporteFalla item)
        {
            var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
            return await bpREP.ReverseReporteFallas(item);
        }

        public async Task<object> changeContratista(Dictionary<string, object> parametros)
        {
            var bpREP = Get<d.SCV.Interfaces.IReportesFallas>();
            var res = await bpREP.ChangeContratistaOTClosed(parametros);
            return res;
        }

        public override async Task<m.SCV.Interfaces.IReporteFalla> Delete(int id)
        {
            var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
            return await bpREP.Delete(id);
        }
    }
}