using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Text.RegularExpressions;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class SeguimientoCampaniaPublicidad
     : p.Kontrol.BPBase<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad, d.SCV.Interfaces.ISeguimientoCampaniaPublicidad>,
     p.SCV.Interfaces.ISeguimientoCampaniaPublicidad
    {
        public SeguimientoCampaniaPublicidad(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISeguimientoCampaniaPublicidad dao)
        : base(factory, dao, "SeguimientoCampaniaPublicidad")
        {
        }

        public async Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetEvents(Dictionary<string, object> parametros)
        {
            var daoS = Get<Datos.SCV.Interfaces.ISeguimientoCampaniaPublicidad>();
            return await daoS.GetEvents(parametros);
        }
        public async Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetLinks(Dictionary<string, object> parametros)
        {
            var daoS = Get<Datos.SCV.Interfaces.ISeguimientoCampaniaPublicidad>();
            return await daoS.GetLinks(parametros);
        }

        public async Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetLinkDetail(Dictionary<string, object> parametros)
        {
            var daoS = Get<Datos.SCV.Interfaces.ISeguimientoCampaniaPublicidad>();
            return await daoS.GetLinkDetail(parametros);
        }

        public async Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetEventDetail(Dictionary<string, object> parametros)
        {
            var daoS = Get<Datos.SCV.Interfaces.ISeguimientoCampaniaPublicidad>();
            return await daoS.GetEventDetail(parametros);
        }


    }
}