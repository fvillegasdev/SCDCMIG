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
    public class ReporteEncuestaSatisfaccion
        : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteEncuestaSatisfaccion, d.SCV.Interfaces.IReporteEncuestaSatisfaccion>,
        p.SCV.Interfaces.IReporteEncuestaSatisfaccion
    {
        public ReporteEncuestaSatisfaccion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteEncuestaSatisfaccion dao) : base(factory, dao, "ReporteEncuestaSatisfaccion") { }
        public async Task<List<m.SCV.Interfaces.IReporteEncuestaSatisfaccion>> GetReporte(Dictionary<string, object> parametros)
        {
            var getReporte = await this.dao.GetReporte(parametros);
            return getReporte;
        }
        public async Task<List<m.SCV.Interfaces.IReporteEncuestaSatisfaccion>> GetGrafica(Dictionary<string, object> parametros)
        {
            var getGrafica = await this.dao.GetGrafica(parametros);
            return getGrafica;
        }
    }
}
