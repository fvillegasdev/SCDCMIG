using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EK.Procesos.SCV
{
    public class ReporteBoletasProspeccion
        : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteBoletasProspeccion, d.SCV.Interfaces.IReporteBoletasProspeccion>, p.SCV.Interfaces.IReporteBoletasProspeccion
    {
        public ReporteBoletasProspeccion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteBoletasProspeccion dao)
            : base(factory, dao, "ReporteBoletasProspeccion")
        {
        }

        public async Task<object> GetReportesBoletasProspeccion(Dictionary<string, object> parametros)
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

            var daoReporteBoletasProspeccion = Get<d.SCV.Interfaces.IReporteBoletasProspeccion>();
            retValue = await daoReporteBoletasProspeccion.GetAllReporteBoletasProspeccion(parametros);
            return retValue;
        }


    }
}