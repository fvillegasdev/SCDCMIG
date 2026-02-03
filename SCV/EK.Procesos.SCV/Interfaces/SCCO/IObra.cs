using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("Obra")]
    public interface IObra
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.IObra>
    {
        Task<m.SCCO.Interfaces.IObra> FillObra(int idCurrentItem, int idObraUniversal, int idObraTabulador);
    }
}