using m = EK.Modelo;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Expedientes_Instantaneas")]
    public interface IExpedientesInstantaneas
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IExpedienteInstantanea>
    {
        Task<m.SCV.Interfaces.ISeguimientoEtapa> SaveInstantaneasAll(int idSeguimiento, int? orden, string claveProceso);
        Task<List<m.Kontrol.Interfaces.IUsuario>> GetSuperiores(int idAgente);
    }
}