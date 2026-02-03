using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("FasesExpediente")]

    public interface IFasesExpediente : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<m.SCV.Interfaces.IFaseExpediente> GetByClave(string clave);
    }
}