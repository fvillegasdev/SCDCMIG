using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class PersonaEntregaVivienda
        : BPBase<m.Kontrol.Interfaces.IPersonaEntregaVivienda, d.Kontrol.Interfaces.IPersonaEntregaVivienda>, p.Kontrol.Interfaces.IPersonaEntregaVivienda
    {
        public PersonaEntregaVivienda(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPersonaEntregaVivienda dao)
               : base(factory, dao, "PersonaEntregaVivienda")
        {
        }


        public async override Task<List<m.Kontrol.Interfaces.IPersonaEntregaVivienda>> GetAll(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAll(parametros);
        }
        

    }

}


