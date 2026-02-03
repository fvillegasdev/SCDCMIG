using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IBoletasProspeccion
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IBoletasProspecccion>
    {
        Task<m.SCV.Interfaces.IBoletasProspecccion> GetByIdBoleta(Dictionary<string, object> parametros);
        Task<object> GetAllBoleta(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IBoletasProspecccion> GetByIdSource(string idSource);


    }
}
