using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Opciones
        : BPBase<m.Kontrol.Interfaces.IOpcionModulo, d.Kontrol.Interfaces.IOpciones>, p.Kontrol.Interfaces.IOpciones
    {
        public Opciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IOpciones dao)
               : base(factory, dao, "opciones")
        {
        }
        public async Task<List<m.Kontrol.Interfaces.IOpcionModulo>> GetDashBoards(Dictionary<string, object> parametros)
        {
            var retValue = Get<m.Kontrol.Interfaces.IOpcionModulo>();
            return await this.dao.GetDashBoards(parametros);
        }

    }
}
