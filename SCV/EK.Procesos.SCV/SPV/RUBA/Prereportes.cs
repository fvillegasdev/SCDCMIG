using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Dynamic;

namespace EK.Procesos.SCV
{
    public class Prereportes : p.Kontrol.BPBase<m.SCV.Interfaces.IPrereporte, d.SCV.Interfaces.IPrereportes>,
        p.SCV.Interfaces.IPrereportes
    {
        public Prereportes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IPrereportes dao)
            : base(factory, dao, "prereportes")
        {
        }

        public override async Task<List<m.SCV.Interfaces.IPrereporte>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("idUsuario", base.getUserId());
            return await base.GetAll(parametros);
        }

        public async Task<m.SCV.Interfaces.IPrereporte> Reject(m.SCV.Interfaces.IPrereporte item)
        {
            var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
            m.SCV.Interfaces.IPrereporte retValue = null;

            try
            {
                item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                item.EstatusReporteId = 2;
                item.Modificado = DateTime.UtcNow;
                item.IdModificadoPor = base.getUserId();
                item.Changed("EstatusReporteId", true);
                item.Changed("Modificado", true);
                item.Changed("IdModificadoPor", true);

                retValue = await this.dao.SaveEntity(item, true, false);

                dynamic obj = new ExpandoObject();
                obj.pre_folio = item.IdPrereporte;
                obj.client_code = item.IdCliente;
                obj.folio = "";
                obj.date = DateTime.UtcNow.ToString("yyyy'-'MM'-'dd HH:mm:ss");

                List<dynamic> listOfx = new List<dynamic>();
                var estatusNotificacion = "";
                foreach (var p in item.Partidas)
                {
                    estatusNotificacion = "rejected";

                    dynamic x = new ExpandoObject();
                    x.issue_number = p.Partida;
                    x.status = estatusNotificacion;
                    x.location = p.UbicacionFalla.Descripcion;
                    x.description = p.Observaciones;

                    listOfx.Add(x);
                }
                obj.issues = listOfx;

                await bpREP.RequestURI("report/status", obj);
                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected override async Task<m.SCV.Interfaces.IPrereporte> afterGetItem(m.SCV.Interfaces.IPrereporte item)
        {
            var daoDET = Get<d.SCV.Interfaces.IPrereportesDetalles>();

            var parametros = new Dictionary<string, object>();
            parametros.Add("idPrereporte", item.IdPrereporte);
            parametros.Add("idCliente", item.IdCliente);

            item.Partidas = await daoDET.GetAll(parametros);

            return await base.afterGetItem(item);
        }
    }
}