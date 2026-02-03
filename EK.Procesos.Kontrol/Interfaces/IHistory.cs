using System.Threading.Tasks;
using EK.Modelo.Kontrol;
using mdl = EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol.Interfaces
{
    [KontrolName("History")]
    public interface IHistory
        : Kontrol.Interfaces.IBaseProceso
    {
        Task<object[]> GetHistory(string entity, int id, int top);
        //object GetHistory(string entity, int top, string order);
    }
}
