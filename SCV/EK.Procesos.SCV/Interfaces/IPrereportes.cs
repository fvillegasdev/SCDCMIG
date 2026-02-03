using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Prereportes")]
    public interface IPrereportes
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPrereporte>
    {
        Task<m.SCV.Interfaces.IPrereporte> Reject(m.SCV.Interfaces.IPrereporte item);
    }
}