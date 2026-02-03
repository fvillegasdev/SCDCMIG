using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using m = EK.Modelo;
using d=EK.Datos;
using p = EK.Procesos;



namespace EK.Procesos.SCV
{
    public class Impuestos
        :p.Kontrol.BPBase<m.SCV.Interfaces.IImpuestos,d.SCV.Interfaces.IImpuestos>,p.SCV.Interfaces.IImpuestos
    {
        public Impuestos(m.Kontrol.Interfaces.IContainerFactory factory,d.SCV.Interfaces.IImpuestos dao)
            :base(factory,dao, "Impuestos")
        {
        }

        public async Task<object> GetImpuestos(Dictionary<string, object> parametros)
        {
            object retValue = null;
            var daoImpuestos = Get<d.SCV.Interfaces.IImpuestos>();
            if (parametros ==null)
            {
                var p = new Dictionary<string, object>();
                p.Add("activos",1);
                retValue = await daoImpuestos.GetAllImpuestos(p);
                return retValue;
            }
            retValue = await daoImpuestos.GetAllImpuestos(parametros);
            return retValue;
        }
    }
}
