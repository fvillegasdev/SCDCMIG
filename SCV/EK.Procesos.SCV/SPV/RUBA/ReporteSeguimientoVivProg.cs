using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class ReporteSeguimientoVivProg
        : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteSeguimientoVivProg, d.SCV.Interfaces.IReporteSeguimientoVivProg>,
        p.SCV.Interfaces.IReporteSeguimientoVivProg
    {
        public ReporteSeguimientoVivProg(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteSeguimientoVivProg dao) : base(factory, dao, "ReporteSeguimientoVivProg") { }

        public async Task<List<m.SCV.Interfaces.IReporteSeguimientoVivProg>> GetReporteSeguimiento(Dictionary<string, object> parametros)
        {
            var getReporte = await this.dao.GetReporteSeguimiento(parametros);
            return getReporte;
        }
    }
}
