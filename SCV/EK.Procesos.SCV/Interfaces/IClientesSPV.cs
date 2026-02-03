using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ClientesSPV")]
    public interface IClientesSPV
        : m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IClientesSPV>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<m.SCV.Interfaces.IClienteSPVEtapa> GetEtapaEntrega(int idCliente);
        Task<List<m.SCV.Interfaces.IClientesSPV>> GetClientesSPV(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClientesSPV>> SearchClienteML(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClientesSPV>> SearchClienteEND(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IClientesSPV> UpdateContacto(m.SCV.Interfaces.IClientesSPV item);
        Task<m.SCV.Interfaces.IBitacoraCliente> GetBitacora(int idCliente);
        Task<m.SCV.Interfaces.IClientesSPV> SaveContacto(m.SCV.Interfaces.IClientesSPV cliente);
    }
}