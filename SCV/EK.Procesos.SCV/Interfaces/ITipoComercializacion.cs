using System.Threading.Tasks;
using m = EK.Modelo.SCV.Interfaces;
using mk = EK.Modelo.Kontrol;
using pki = EK.Procesos.Kontrol.Interfaces;

namespace EK.Procesos.SCV.Interfaces
{
    [mk.KontrolName("tipoComercializacion")]
    public interface ITipoComercializacion : pki.IBaseProceso { }
}
