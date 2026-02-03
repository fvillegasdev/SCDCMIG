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
    public class GrupoInsumo
         : p.Kontrol.BPBase<m.SCCO.Interfaces.IGrupoInsumo, d.SCCO.Interfaces.IGrupoInsumo>, p.SCCO.Interfaces.IGrupoInsumo
    {
        public GrupoInsumo(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IGrupoInsumo dao)
            : base(factory, dao, "scco_GrupoInsumo")
        {

        }

        public async Task<object> GetGrupoInsumo(Dictionary<string, object> parametros)
        {
            object retValue = null;
            var daoGrupoInsumo = Get<d.SCCO.Interfaces.IGrupoInsumo>();
            if(parametros == null)
            {
                var p = new Dictionary<string, object>();
                p.Add("activos",1);
                retValue = await daoGrupoInsumo.GetAllGrupoInsumo(p);
                return retValue;
            }
            retValue = await daoGrupoInsumo.GetAllGrupoInsumo(parametros);
            return retValue;
        }
    }
}
