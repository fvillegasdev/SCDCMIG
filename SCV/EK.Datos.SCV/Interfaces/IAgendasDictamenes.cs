using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IAgendasDictamenes
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IAgendaDictamen>
    {
        Task<int> VerificarFechasAgendaDictamen(m.SCV.Interfaces.IAgendaDictamen item);
    }
}