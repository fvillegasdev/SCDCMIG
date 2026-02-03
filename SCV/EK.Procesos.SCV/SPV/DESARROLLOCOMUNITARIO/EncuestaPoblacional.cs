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
    public class EncuestaPoblacional
        : p.Kontrol.BPBase<m.SCV.Interfaces.IEncuestaPoblacional, d.SCV.Interfaces.IEncuestaPoblacional>, p.SCV.Interfaces.IEncuestaPoblacional
    {
        public EncuestaPoblacional(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IEncuestaPoblacional dao)
           : base(factory, dao, "EncuestaPoblacional")
        {
        }
        public async Task<object[]> GetEncuestaXFraccionamientoLote(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetEncuestaXFraccionamientoLote(parametros);

            return Result;
        }
        public async Task<object[]> SaveSurvay(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            var Result = await this.dao.SaveSurvay(parametros);

            return Result;
        }
        public async Task<object[]> GetTipoEncuesta(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetTipoEncuesta(parametros);

            return Result;
        }
        public async Task<object[]> GetTipoClasificacion(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetTipoClasificacion(parametros);

            return Result;
        }
        public async Task<object[]> GetConsulta(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetConsulta(parametros);

            return Result;
        }
        public async Task<object[]> EncuestaDetalle(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.EncuestaDetalle(parametros);

            return Result;
        }
    }
}
