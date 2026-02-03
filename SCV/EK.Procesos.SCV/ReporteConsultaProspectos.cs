using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EK.Procesos.SCV
{
    public class ReporteConsultaProspectos
        : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteConsultaProspectos, d.SCV.Interfaces.IReporteConsultaProspectos>, p.SCV.Interfaces.IReporteConsultaProspectos
    {
        public ReporteConsultaProspectos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteConsultaProspectos dao)
            : base(factory, dao, "ReporteConsultaProspectos")
        {
        }

        public async Task<object> GetReporteConsultaProspectos(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            
            object retValue = null;
            //int idUser = 0;
            //if (parametros.ContainsKey("IdAgente"))
            //{
            //    idUser = Convert.ToInt32(parametros["IdAgente"]);
            //    parametros.Remove("IdAgente");
            //}
            //else
            //{
            //    idUser = base.getUserId();
            //}
            //parametros.Add("idUsuario", idUser);

            var daoReporteConsultaProspectos = Get<d.SCV.Interfaces.IReporteConsultaProspectos>();
            retValue = await daoReporteConsultaProspectos.GetAllReporteConsultaProspectos(parametros);
            return retValue;
        }


    }
}