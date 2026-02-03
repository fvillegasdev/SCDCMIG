using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.Interfaces
{
    public interface IAgendaEntVivienda
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IAgendaEntVivienda>
    {
        Task<int> SaveAgendaEntregaVivienda(m.Kontrol.Interfaces.IAgendaEntVivienda item, m.Kontrol.Interfaces.IItemGeneral estatusAgenda);
    }
}