using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo.SCV.Interfaces;
using mk = EK.Modelo;
using pki = EK.Procesos.Kontrol.Interfaces;

namespace EK.Procesos.SCV.Interfaces
{
    [mk.Kontrol.KontrolName("PuntosVenta")]
    public interface IPuntosVenta : pki.IBaseProceso , mk.Kontrol.Interfaces.IBPBase<mk.SCV.Interfaces.IPuntoVenta>
    {
        Task<List<m.IPuntosVentaDesarrollos>> GetDesarrollosPorPuntoVenta(Dictionary<string, object> parametros);
    }
}
