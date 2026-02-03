using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV
{
    public class ReporteProspectosClientes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteProspectosClientes, d.SCV.Interfaces.IReporteProspectosClientes>, p.SCV.Interfaces.IReporteProspectosClientes
    {
        public ReporteProspectosClientes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteProspectosClientes dao)
            : base(factory, dao, "ReporteProspectosClientes")
        {
        }

        public async Task<object> GetReporteProspectosClientes(Dictionary<string, object> parametros)
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
            var daoReporteProspectosClientes = Get<d.SCV.Interfaces.IReporteProspectosClientes>();

            try
            {
                retValue = await daoReporteProspectosClientes.GetAllReporteProspectosClientes(parametros);

            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetReporteProspectosClientes::" + ex.Message, ex);
            }
            //var daoReporteProspectosClientes = Get<d.SCV.Interfaces.IReporteProspectosClientes>();
            //retValue = await daoReporteProspectosClientes.GetAllReporteProspectosClientes(parametros);
            return retValue;
        }


    }
}