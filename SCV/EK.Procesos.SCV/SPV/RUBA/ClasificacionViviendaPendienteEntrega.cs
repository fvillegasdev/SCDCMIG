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
    public class ClasificacionViviendaPendienteEntrega
         : p.Kontrol.BPBase<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega, d.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>, p.SCV.Interfaces.IClasificacionViviendaPendienteEntrega
    {
        public ClasificacionViviendaPendienteEntrega(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IClasificacionViviendaPendienteEntrega dao)
           : base(factory, dao, "ClasificacionViviendaPen")
        {
        }
        public async Task<List<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>> GetViviendaPendienteEntrega(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetViviendaPendienteEntrega(parametros);

            return Result;
        }
       // public async Task<List<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>> ClasificadorSave(Dictionary<string, object> parametros)
        public async Task<List<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>> ClasificadorSave(List<m.SCV.Interfaces.IClasificacionViviendaPendienteEntregaParam> parametros)
        {
            foreach(var x in parametros)
            {
                x.Usuario = getUserId();
            }
            //parametros.Add("Usuario", getUserId());
            var Clasificador = await this.dao.ClasificadorSave(parametros);

            return Clasificador;

        }
        public async Task<object[]> GetReporteViviendaPE(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetReporteViviendaPE(parametros);

            return Result;
        }
        public async Task<object[]> GetReporteViviendaPEPlaza(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetReporteViviendaPEPlaza(parametros);

            return Result;

        }
        public async Task<object[]> GetReportePromedioDiasPlaza(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetReportePromedioDiasPlaza(parametros);

            return Result;
        }
        public async Task<object[]> GetReportePromedioDiasVivienda(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetReportePromedioDiasVivienda(parametros);

            return Result;

        }
    }
}
