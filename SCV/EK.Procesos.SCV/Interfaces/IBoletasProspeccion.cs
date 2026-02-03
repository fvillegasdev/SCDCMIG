using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("boletasProspeccion")]
    public interface IBoletasProspeccion
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IBoletasProspecccion>
    {
        Task<m.SCV.Interfaces.IBoletasProspecccion> GetByBoletaProspectoId(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IBoletasProspecccion> GenerateCliente(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IBoletasProspecccion> RejectBoleta(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IBoletasProspecccion> GenerateDeveloment(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IBoletasProspecccion> CreateBoletaProspeccion(Dictionary<string, object> parametros);
    }
}