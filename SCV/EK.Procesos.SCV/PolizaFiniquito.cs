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
    public class PolizaFiniquito
    : p.Kontrol.BPBase<m.SCV.Interfaces.IPolizaFiniquito, d.SCV.Interfaces.IPolizaFiniquito>,
    p.SCV.Interfaces.IPolizaFiniquito
    {
        public PolizaFiniquito(m.Kontrol.Interfaces.IContainerFactory factory,
        d.SCV.Interfaces.IPolizaFiniquito dao)
        : base(factory, dao, "scv_PolizaFiniquito")
        {
        }

        public async Task<object> GetExpedientesPolizaFiniquito(Dictionary<string, object> parametros)
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
            //parametros.Add("operacion", "expedientes");
            //
            var daoCatalogosGenerales = Get<d.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var EstadoPoliza = await daoCatalogosGenerales.GetByClave("EstadoPolizaFiniquito", "PFNG");
            object IdEstadoPoliza = string.Empty;

            parametros.TryGetValue("IdEstadoPolizaFiniquito", out IdEstadoPoliza);
            var a = Convert.ToInt32(IdEstadoPoliza);

            if (parametros.ContainsKey("IdEstadoPolizaFiniquito") && EstadoPoliza.ID != a)
            {
                var daoPolizaFiniquito = Get<d.SCV.Interfaces.IPolizaFiniquito>();
                retValue = await daoPolizaFiniquito.GetAllPolizaGenerada(parametros);
            }
            else
            {
                parametros.Remove("IdEstadoPolizaFiniquito");
                parametros.Remove("FilterFechaPoliza");
                parametros.Remove("IdFilterTiposDeProcesos");
                var daoPolizaFiniquito = Get<d.SCV.Interfaces.IPolizaFiniquito>();
                retValue = await daoPolizaFiniquito.GetAllPolizaNoGenerada(parametros);
            }
            return retValue;
        }

        public async Task<m.SCV.Interfaces.IPolizaFiniquito> SolicitudPoliza(List<int> Expedientes, int IdTipoProceso, DateTime FechaPoliza)
        {
            m.SCV.Interfaces.IPolizaFiniquito retValue = null;
            var model = Get<m.SCV.Interfaces.IPolizaFiniquito>();
            model.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo; 
            
            DateTime Fecha = Convert.ToDateTime(FechaPoliza);
            try
            {
                BeginTransaction();
                //Valida datos para solicitud. 
                if (Expedientes.Count > 0 && IdTipoProceso > 0 && Fecha != null)
                {
                    var daoCatalogosGenerales = Get<d.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var EstadoPoliza = await daoCatalogosGenerales.GetByClave("EstadoPolizaFiniquito", "PFEP");
                    int IdEstadoPoliza = Convert.ToInt32(EstadoPoliza.ID);
                    foreach (var i in Expedientes) {
                        model.IdExpediente = i;
                        model.IdTipoProceso = IdTipoProceso;
                        model.IdEstadoPoliza = IdEstadoPoliza;
                        model.FechaPoliza = Fecha;
                        //Se realiza solicitud de poliza por cada expediente. Save.
                        var daoPolizaFiniquito = Get<d.SCV.Interfaces.IPolizaFiniquito>();
                        retValue = await daoPolizaFiniquito.SaveEntity(model, false);
                    }
                }
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("SolicitudPoliza::" + ex.Message, ex);
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IPolizaFiniquito> CancelarPoliza(List<int> Expedientes)
        {
            var retValue = Get<m.SCV.Interfaces.IPolizaFiniquito>();

            //Agrega Usuario a parametros 
            int idUser = 0;
            idUser = base.getUserId();

            try
            {
                BeginTransaction();

                if (Expedientes.Count > 0)
                {
                    foreach (var e in Expedientes) {
                        Dictionary<string, object> parametros = new Dictionary<string, object>
                        {
                            { "IdExpediente", e },
                            { "IdUsuario", idUser }
                        };
                        var daoPolizaFiniquito = Get<d.SCV.Interfaces.IPolizaFiniquito>();
                        int IDELIMINA_POLIZA = 0;
                        IDELIMINA_POLIZA = await daoPolizaFiniquito.CancelarPoliza(parametros);
                        retValue.ID = IDELIMINA_POLIZA;
                        if (IDELIMINA_POLIZA <= 0)
                        {
                            base.SetReturnInfo(3, "Solicitud de cancelación de Poliza no Enviada");
                        }
                    }
                    Commit();
                }
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("CancelarPoliza::" + ex.Message, ex);
            }

            return retValue;
        }

    }
}