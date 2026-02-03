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
    public class AnalisisProspecto
        : p.Kontrol.BPBase<m.SCV.Interfaces.IAnalisisProspecto, d.SCV.Interfaces.IAnalisisProspecto>, p.SCV.Interfaces.IAnalisisProspecto
    {
        public AnalisisProspecto(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IAnalisisProspecto dao)
            : base(factory, dao, "AnalisisProspecto")
        {
        }

        public new async Task<object> GetAll(Dictionary<string, object> parametros)
        {
            if (parametros.ContainsKey("IdTipoVista"))
            {
                parametros.Remove("IdTipoVista");
            }

            parametros.Add("idUsuarioEnCurso", base.getUserId());
            return await this.dao.GetAllAnalisisProspecto(parametros);
        }


        public async Task<object> GetReporteJerarquico(Dictionary<string, object> parametros)
        {
            if (parametros.ContainsKey("IdTipoVista"))
            {
                parametros.Remove("IdTipoVista");
            }

            parametros.Add("idUsuario", base.getUserId());
            return await this.dao.GetReporteJerarquicoAnalisisProspecto(parametros);
        }
    }
}
