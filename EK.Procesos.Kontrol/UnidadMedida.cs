using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using p = EK.Procesos;
using m = EK.Modelo;
using d = EK.Datos;


namespace EK.Procesos.Kontrol
{
    public class UnidadMedida
        :p.Kontrol.BPBase<m.Kontrol.Interfaces.IUnidadMedida,d.Kontrol.Interfaces.IUnidadMedida>,p.Kontrol.Interfaces.IUnidadMedida
    {
        public UnidadMedida(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IUnidadMedida dao)
            :base(factory,dao, "UnidadMedida")
        {

        }

        public async Task<object> GetUnidadMedida(Dictionary<string, object> parametros)
        {
            object retValue = null;
            var daoUnidadMedida = Get<d.Kontrol.Interfaces.IUnidadMedida>();
            if (parametros == null)
            {
                var p = new Dictionary<string, object>();
                p.Add("activos", 1);
                retValue = await daoUnidadMedida.GetAllUnidadMedida(p);
                return retValue;
            }
            retValue = await daoUnidadMedida.GetAllUnidadMedida(parametros);
            return retValue;
        }
    }
}
