using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;


namespace EK.Procesos.SCV
{
    public class Origen
     : p.Kontrol.BPBase<m.SCV.Interfaces.IOrigen, d.SCV.Interfaces.IOrigen>, p.SCV.Interfaces.IOrigen
    {
    public Origen(m.Kontrol.Interfaces.IContainerFactory factory,
    d.SCV.Interfaces.IOrigen dao)
    : base(factory, dao, "scv_Origen")
        {

        }

        public async Task<object> GetTipoOrigen(Dictionary<string,object> parametros)
        {
            object retValue = null;
            var daoTipoOrigen = Get<d.SCV.Interfaces.IOrigen>();
            if(parametros == null)
            {
                var p = new Dictionary<string, object>();
                p.Add("activos",1);
                retValue = await daoTipoOrigen.GetAll(p);
                return retValue;
            }
            retValue = await daoTipoOrigen.GetAll(parametros);
            return retValue;
        }

    }
}
