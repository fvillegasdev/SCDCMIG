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
    public class TipoInsumo
        : p.Kontrol.BPBase<m.SCCO.Interfaces.ITipoInsumo, d.SCCO.Interfaces.ITipoInsumo>, p.SCCO.Interfaces.ITipoInsumo

    {
        public TipoInsumo(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.ITipoInsumo dao)
            : base(factory, dao, "TipoInsumo")
        {
        }

        public async Task<object> GetTipoInsumo(Dictionary<string,object> parametros)
        {
            object retValue = null;
            var daoTipoInsumo = Get < d.SCCO.Interfaces.ITipoInsumo>();
            if (parametros == null) {
                var p = new Dictionary<string,object>();
                p.Add("activos",1);
                retValue = await daoTipoInsumo.GetAllTipoInsumo(p);
                return retValue;
            }
            retValue = await daoTipoInsumo.GetAllTipoInsumo(parametros);
            return retValue;
        }
    }
}