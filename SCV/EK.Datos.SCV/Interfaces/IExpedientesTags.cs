using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IExpedientesTags :
        d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IExpedienteTags>
    {
        Task<List<m.Kontrol.Interfaces.IClasificador>> ObtenerTagsExpediente(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IExpedienteTags>> ObtenerTagsPorExpediente(Dictionary<string, object> parametros);

    }
}
