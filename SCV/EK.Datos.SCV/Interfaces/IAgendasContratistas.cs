using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IAgendasContratistas
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IAgendaContratista>
    {
        Task<int> VerificarFechasAgendaContratista(m.SCV.Interfaces.IAgendaContratista item);
    }
}