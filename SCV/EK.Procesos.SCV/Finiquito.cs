using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using Newtonsoft.Json;

namespace EK.Procesos.SCV
{
    public class Finiquito
    : p.Kontrol.BPBase<m.SCV.Interfaces.IFiniquito, d.SCV.Interfaces.IFiniquito>,
    p.SCV.Interfaces.IFiniquito
    {
        public Finiquito(m.Kontrol.Interfaces.IContainerFactory factory,
        d.SCV.Interfaces.IFiniquito dao)
        : base(factory, dao, "scv_Finiquito")
        {
        }

        public async Task<object> GetExpedientesFiniquito(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }
            parametros.Add("idUsuario", idUser);

            var daoFiniquito = Get<d.SCV.Interfaces.IFiniquito>();
            retValue = await daoFiniquito.GetAllExpedientesFiniquito(parametros);
            return retValue;
        }

        public async Task<m.SCV.Interfaces.IFiniquito> CancelarFiniquito(List<int> Expedientes)
        {
            var retValue = Get<m.SCV.Interfaces.IFiniquito>();

            //Agrega Usuario a parametros 
            int idUser = 0;
            idUser = base.getUserId();

            try
            {
                BeginTransaction();

                if (Expedientes.Count > 0)
                {
                    foreach (var e in Expedientes)
                    {
                        Dictionary<string, object> parametros = new Dictionary<string, object>
                        {
                            { "IdExpediente", e },
                            { "IdUsuario", idUser }
                        };
                        var daoFiniquito = Get<d.SCV.Interfaces.IFiniquito>();
                        int IDELIMINA_FINIQUITO = 0;
                        IDELIMINA_FINIQUITO = await daoFiniquito.CancelarFiniquito(parametros);
                        retValue.ID = IDELIMINA_FINIQUITO;
                        if (IDELIMINA_FINIQUITO <= 0)
                        {
                            base.SetReturnInfo(3, "Solicitud de cancelación de Finiquito no Enviada");
                        }
                    }
                    Commit();
                }
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("CancelarFiniquito::" + ex.Message, ex);
            }

            return retValue;
        }

    }
}