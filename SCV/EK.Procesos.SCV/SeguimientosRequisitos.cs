using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using p = EK.Procesos;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Procesos.SCV
{
    public class SeguimientosRequisitos
         : p.Kontrol.ProcesoBase,
        p.SCV.Interfaces.ISeguimientosRequisitos,
        p.Kontrol.Interfaces.IWorkflowBP
    {
        private d.SCV.Interfaces.ISeguimientos dao;

        public SeguimientosRequisitos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISeguimientos dao)
            : base(factory, dao, "seguimientosRequisitos")
        {
            this.factory = factory;
            this.dao = dao;
        }

        public async Task<p.Kontrol.WorkflowResult> Authorize(int id, Modelo.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                retValue.Success = true;
                retValue.Message = $"Se autorizó el requisito #{id}";

                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", id);
                parameters.Add("OperacionEspecificaSP", "REQUISITO_UNICO_POR_EXPEDIENTE");
                var requisito = await this.dao.GetRequisito(parameters);

                var bpSeguimiento = Get<p.SCV.Interfaces.ISeguimientos>();
                await bpSeguimiento.UpdateEstatusRequisito(requisito.IdExpediente, requisito.IdRequisito, id, "E");

                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return retValue;
        }

        public async Task<p.Kontrol.WorkflowResult> Reject(int id, Modelo.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                retValue.Success = true;
                retValue.Message = $"Se rechazó el requisito #{id}";

                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", id);
                parameters.Add("OperacionEspecificaSP", "REQUISITO_UNICO_POR_EXPEDIENTE");
                var requisito = await this.dao.GetRequisito(parameters);

                var bpSeguimiento = Get<p.SCV.Interfaces.ISeguimientos>();
                await bpSeguimiento.UpdateEstatusRequisito(requisito.IdExpediente, requisito.IdRequisito, id, "P");

                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return retValue;
        }

        public override async Task<string> GetDescripcion(dynamic obj)
        {
            // AUT-EXP
            var plantilla = await GetPlantilla("AUT-REQ", obj, null);
            return plantilla.ToString();

            //var retValue = new StringBuilder();

            //if (obj != null)
            //{
            //    retValue.AppendLine($"{"Requisito: "}{obj.Requisito.Nombre}");
            //    retValue.AppendLine();
            //    retValue.AppendLine($"{"Folio Expediente: "}{obj.IdExpediente}");
            //    retValue.AppendLine($"{"Folio Seguimiento: "}{obj.IdSeguimiento}");
            //    retValue.AppendLine($"{"Etapa: "}{obj.Etapa.Nombre}");
            //    retValue.AppendLine($"{"Requisito Valor: "}{obj.Valor}");
            //    retValue.AppendLine($"{"Requisito Estatus: "}{obj.EstatusRequisito.Nombre}");
            //}

            //return retValue.ToString();
        }
    }
}