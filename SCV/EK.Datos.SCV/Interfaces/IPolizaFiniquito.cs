using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Interfaces
{
    public interface IPolizaFiniquito
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPolizaFiniquito>
    {
        //Task<m.SCV.Interfaces.IPolizaFiniquito> GetByPolizaId(Dictionary<string, object> parametros);
        //Task<List<m.SCV.Interfaces.IPolizaFiniquito>> GetAllParametros(Dictionary<string, object> parametros);
        Task<object> GetAllPolizaGenerada(Dictionary<string, object> parametros);
        Task<object> GetAllPolizaNoGenerada(Dictionary<string, object> parametros);
        Task<int> CancelarPoliza(Dictionary<string, object> parametros);

    }
}





