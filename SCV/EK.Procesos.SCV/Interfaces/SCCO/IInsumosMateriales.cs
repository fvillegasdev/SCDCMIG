using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("InsumosMateriales")]
    public interface IInsumosMateriales
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.IInsumoMaterial>
    {
        Task<m.SCCO.Interfaces.IInsumoMaterial> GetByIdInsumo(int idInsumo);
    }
}