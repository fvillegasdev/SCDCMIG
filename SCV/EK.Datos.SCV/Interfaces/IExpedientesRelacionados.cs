using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.Interfaces
{
    public interface IExpedientesRelacionados
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IExpedienteRelacionado>
    {
    }
}