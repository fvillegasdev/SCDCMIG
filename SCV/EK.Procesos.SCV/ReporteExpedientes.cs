using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ReporteExpedientes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteExpedientes, d.SCV.Interfaces.IReporteExpedientes>, p.SCV.Interfaces.IReporteExpedientes
    {
        public ReporteExpedientes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteExpedientes dao)
            : base(factory, dao, "ReporteExpedientes")
        {
        }

        public async Task<object> GetReporteExpedientes(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }

            object retValue = null;
            var daoReporteBoletasProspeccion = Get<d.SCV.Interfaces.IReporteExpedientes>();
            retValue = await daoReporteBoletasProspeccion.GetAllReporteExpedientes(parametros);
            return retValue;
        }

    }
}
