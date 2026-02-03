using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Text;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class ConsultaReporteAreasComunes : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteFallasAreasComunes, d.SCV.Interfaces.IReporteFallasAreasComunesConsulta>, p.SCV.Interfaces.IReporteFallasAreasComunesConsulta
    {
        public ConsultaReporteAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteFallasAreasComunesConsulta dao)
            : base(factory, dao, "ConsultaReporteAreasComunes")
        {
        }
        public async Task<object[]> GetConsulta(Dictionary<string, object> parametros)
        {
            var consulta = await this.dao.GetConsulta(parametros);
            return consulta;
        }
    }
}
