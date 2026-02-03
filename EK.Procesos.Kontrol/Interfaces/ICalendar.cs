using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("calendario")]
    public interface ICalendar
        : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<m.Kontrol.Interfaces.ICalendar> GetByCurrentUser();
        Task<string> GetTextCalendar();
    }
}