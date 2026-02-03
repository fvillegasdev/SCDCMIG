using m = EK.Modelo;
using d = EK.Datos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Datos.SCV.Interfaces
{
    public interface IDashBoardExpedientes
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IDashBoardExpedienteIndicador>
    {
        Task<object> GetDashboardInfo(Dictionary<string, object> parameters);

        Task<object> GetDasboardDocumentosIndicadores(Dictionary<string, object> parameters);

    }
}