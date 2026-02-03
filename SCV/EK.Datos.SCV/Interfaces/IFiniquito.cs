using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Interfaces
{
    public interface IFiniquito
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IFiniquito>
    {
        Task<object> GetAllExpedientesFiniquito(Dictionary<string, object> parametros);
        Task<int> CancelarFiniquito(Dictionary<string, object> parametros);

    }
}





