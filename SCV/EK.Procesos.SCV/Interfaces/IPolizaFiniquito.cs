using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;


namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("expedientesGenerarPoliza")]
    public interface IPolizaFiniquito
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPolizaFiniquito>
    {
        //Task<List<m.SCV.Interfaces.IPolizaFiniquito>> GetAllParametros(Dictionary<string, object> parametros);
        Task<object> GetExpedientesPolizaFiniquito(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IPolizaFiniquito> CancelarPoliza(List<int> Expedientes);
        Task<m.SCV.Interfaces.IPolizaFiniquito> SolicitudPoliza(List<int> Expedientes, int IdTipoProceso, DateTime FechaPoliza);
    }
}


