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
    public class ConsultaPreparacionVivienda
        : p.Kontrol.BPBase<m.SCV.Interfaces.IConsultaPreparacionVivienda, d.SCV.Interfaces.IConsultaPreparacionVivienda>, p.SCV.Interfaces.IConsultaPreparacionVivienda

    {
        public ConsultaPreparacionVivienda(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IConsultaPreparacionVivienda dao)
            : base(factory, dao, "ConsultaPreparacionVivienda")
        { }

        public async Task<List<m.SCV.Interfaces.IConsultaPreparacionViviendaResult>> GetPreparacionVivienda(Dictionary<string, object> parametros)
        {
            parametros.Add("Usuario", getUserId()); 
            var ResultPreparacionVivienda = await this.dao.GetPreparacionVivienda(parametros);

           return ResultPreparacionVivienda;

        }

    }
}