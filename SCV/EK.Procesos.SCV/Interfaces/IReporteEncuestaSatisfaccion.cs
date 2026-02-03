using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ReporteEncuestaSatisfaccion")]
    public interface IReporteEncuestaSatisfaccion :
        p.Kontrol.Interfaces.IBaseProceso,
        m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IReporteEncuestaSatisfaccion>
    {
        Task<List<m.SCV.Interfaces.IReporteEncuestaSatisfaccion>> GetReporte(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteEncuestaSatisfaccion>> GetGrafica(Dictionary<string, object> parametros);
    }
}
