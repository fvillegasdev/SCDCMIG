using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class TipoMovimiento
        :p.Kontrol.BPBase<m.SCV.Interfaces.ITipoMovimiento,d.SCV.Interfaces.ITipoMovimiento>,p.SCV.Interfaces.ITipoMovimiento
    {
        public TipoMovimiento(m.Kontrol.Interfaces.IContainerFactory factory,d.SCV.Interfaces.ITipoMovimiento dao )
            : base(factory,dao,"TipoMovimiento")
        {
        }

        public async Task<object> GetTipoMovimiento(Dictionary<string,object> parametros)
        {
            object retValue = null;
            var daoTipoMovimiento = Get<d.SCV.Interfaces.ITipoMovimiento>();
            if (parametros == null)
            {
                var p = new Dictionary<string, object>();
                p.Add("activos",1);
                retValue = await daoTipoMovimiento.GetAllTipoMovimiento(p);
                return retValue;
            }
            retValue = await daoTipoMovimiento.GetAllTipoMovimiento(parametros);
            return retValue;
        }
    }
}
