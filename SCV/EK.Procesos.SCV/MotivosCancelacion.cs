using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class MotivosCancelacion
        : p.Kontrol.BPBase<m.SCV.Interfaces.IMotivosCancelacion, d.SCV.Interfaces.IMotivosCancelacion>, p.SCV.Interfaces.IMotivosCancelacion
    {
        public MotivosCancelacion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IMotivosCancelacion dao)
               : base(factory, dao, "motivoscancelacion")
        {
        }

        public async Task<object> GetMotivosCancelacion(Dictionary<string,object> parametros)
        {
            object retValue = null;
            var daoMotivacionCancelacion = Get<d.SCV.Interfaces.IMotivosCancelacion>();
            if (parametros == null)
            {
                var p = new Dictionary<string,object>();
                p.Add("activos",1);
                retValue = await daoMotivacionCancelacion.GetAll(p);
                return retValue;
            }
            retValue = await daoMotivacionCancelacion.GetAll(parametros);
            return retValue;
        }

    }
}

