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
    public class MacroEtapas
        : p.Kontrol.BPBase<m.SCV.Interfaces.IMacroEtapa, d.SCV.Interfaces.IMacroEtapas>,
        p.SCV.Interfaces.IMacroEtapas
    {
        public MacroEtapas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IMacroEtapas dao)
            : base(factory, dao, "macroEtapas")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.IdFaseExpediente = obj.FaseExpediente.ID;
            entity.IdFaseExpedienteClave = obj.FaseExpediente.Clave;
            entity.IdFaseExpedienteNombre = obj.FaseExpediente.Nombre;
        }




        public async Task<object> GetMacroEtapasOrden(Dictionary<string, object> parametros)
        {
            var macroEtapas = await this.dao.GetAll(parametros);
            var macroEtapasOrdenadas = macroEtapas.OrderBy(x => x.FaseExpediente.Orden);
            return macroEtapasOrdenadas;
        }


    }
}