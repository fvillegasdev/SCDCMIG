using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IExpedientes :
        dki.IDAOBaseGeneric<m.SCV.Interfaces.IExpediente>
    {
        Task<m.SCV.Interfaces.IExpediente> GetByIdV2(int id);
        Task<object> GetExpedienteEnEscrituracion(Dictionary<string, object> parametros);




    }
}
