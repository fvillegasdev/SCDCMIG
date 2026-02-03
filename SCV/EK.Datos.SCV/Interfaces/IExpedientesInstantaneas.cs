using m = EK.Modelo;
using d = EK.Datos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Datos.SCV.Interfaces
{
    public interface IExpedientesInstantaneas
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IExpedienteInstantanea>
    {
        Task<List<m.Kontrol.Interfaces.IUsuario>> GetSuperiores(int idAgente);
        Task<object> GetInstantaneaSeguimiento(Dictionary<string, object> parametros);

    }
}