using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Interfaces
{
    public interface IReporteEncuestaSatisfaccion
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IReporteEncuestaSatisfaccion>
    {
        Task<List<m.SCV.Interfaces.IReporteEncuestaSatisfaccion>> GetReporte(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IReporteEncuestaSatisfaccion>> GetGrafica(Dictionary<string, object> parametros);
    }
}
