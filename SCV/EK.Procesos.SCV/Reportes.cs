using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Reportes
        : p.Kontrol.ProcesoBase, p.SCV.Interfaces.IReportes
    {
        private d.SCV.Interfaces.IReportes dao = null;
        //
        public Reportes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReportes dao)
            : base(factory, dao, "Reportes")
        {
            this.dao = dao as d.SCV.Interfaces.IReportes;
        }
        //
        public async Task<object[]> GetMonitoreoAgentes(Dictionary<string, object> parametros) {
            return await this.dao.GetMonitoreoAgentes(parametros);
        }
    }
}