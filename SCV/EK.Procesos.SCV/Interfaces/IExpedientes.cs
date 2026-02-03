using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Expedientes")]
    public interface IExpedientes : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<object> GetByIdV2(int id);
        Task<object> GetByIdConfiguration(int id);
        Task<List<m.SCV.Interfaces.ISeguimiento>> GetConfiguracionAll(int idExpediente);
        Task<m.SCV.Interfaces.IExpediente> GetByCatalogo(int id);
        Task<List<m.SCV.Interfaces.IExpedienteOwner>> GetOwners(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IExpedienteRelacionado>> GetRelacionados(Dictionary<string, object> parametros);
        Task<int> SaveConfiguracion(m.SCV.Interfaces.ISeguimiento item);
        Task<m.SCV.Interfaces.IExpediente> CancelarExpediente(int id);
        Task<int> UpdateRequisito(int idExpediente, string claveRequisito, string valor);
        Task<object> AllowCancelacion(int id);
        Task<object> GetExpedienteObject(int id, string entityName, int idExpediente);
    }
}