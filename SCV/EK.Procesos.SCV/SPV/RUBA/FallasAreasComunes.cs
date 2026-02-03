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
    public class FallasAreasComunes : p.Kontrol.BPBase<m.SCV.Interfaces.IFallasAreasComunes, d.SCV.Interfaces.IFallasAreasComunes>, p.SCV.Interfaces.IFallasAreasComunes
    {
        public FallasAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IFallasAreasComunes dao)
            : base(factory, dao, "catFallasAreasComunes")
        {
        }

        public async Task<object[]> GetCatalogo(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetCatalogo(parametros);
            return Result;
        }
        public async Task<object[]> CrudCatalogoFallaAreaComun(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.CrudCatalogoFallaAreaComun(parametros);
            return Result;
        }
    }
}
