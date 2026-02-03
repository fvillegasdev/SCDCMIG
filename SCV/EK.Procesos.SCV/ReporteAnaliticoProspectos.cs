using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EK.Procesos.SCV
{
    public class ReporteAnaliticoProspectos
        : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteAnaliticoProspectos, d.SCV.Interfaces.IReporteAnaliticoProspectos>, p.SCV.Interfaces.IReporteAnaliticoProspectos
    {
        public ReporteAnaliticoProspectos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteAnaliticoProspectos dao)
            : base(factory, dao, "ReporteAnaliticoProspectos")
        {
        }

        public async Task<object> GetReporteAnaliticoProspectos(Dictionary<string, object> parametros)
        {
            var daoReporteAnaliticoProspectos = Get<d.SCV.Interfaces.IReporteAnaliticoProspectos>();
            return await daoReporteAnaliticoProspectos.GetAllReporteAnaliticoProspectos(parametros);
        }


    }
}