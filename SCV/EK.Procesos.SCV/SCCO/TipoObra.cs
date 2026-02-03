using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class TipoObra
        : p.Kontrol.BPBase<m.SCCO.Interfaces.ITipoObra, d.SCCO.Interfaces.ITipoObra>, p.SCCO.Interfaces.ITipoObra

    {
        public TipoObra(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.ITipoObra dao)
            : base(factory, dao, "TipoObra")
        {
        }
        

        public async Task<object> GetTipoObra(Dictionary<string, object> parametros)
        {
            object retValue = null;
            var daoTipoObra = Get<d.SCCO.Interfaces.ITipoObra>();
            if (parametros == null)
            {
               var p = new Dictionary<string, object>();
               p.Add("activos",1);
               retValue = await daoTipoObra.GetAllTipoObra(p);
               return retValue;
            }
            
            retValue = await daoTipoObra.GetAllTipoObra(parametros);
            return retValue;
        }


    }
}