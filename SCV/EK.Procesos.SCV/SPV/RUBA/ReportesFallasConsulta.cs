using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Text;

namespace EK.Procesos.SCV
{
    public class ReportesFallasConsulta : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteFalla, d.SCV.Interfaces.IReportesFallasConsulta>,
        p.SCV.Interfaces.IReportesFallasConsulta
    {
        public ReportesFallasConsulta(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReportesFallasConsulta dao)
            : base(factory, dao, "reportesFallasConsulta")
        {
        }

        public async Task<object[]> GetConsulta(m.SCV.Interfaces.IReporteFallaConsulta filters)
        {
            string desarrollosValue = string.Empty;

            if (filters.Fraccionamientos != null)
            {
                var fraccBuilder = new StringBuilder();

                foreach (var ff in filters.Fraccionamientos)
                {
                    fraccBuilder.Append(ff.Clave);
                    fraccBuilder.Append(",");
                }

                desarrollosValue = fraccBuilder.ToString();
                desarrollosValue = desarrollosValue.TrimEnd(new char[] { ',' });
            }

            if (filters.CausaFalla != null)
            {
                filters.IdCausaFalla = filters.CausaFalla.ID == -2 ? -2 : filters.CausaFalla.IdCausaFalla;
            }

            if (filters.Falla != null)
            {
                filters.IdFalla = filters.Falla.IdFalla;
            }

            var parametros = new Dictionary<string, object>();
            parametros.Add("IdPlaza", filters.IdPlazaInicial);
            parametros.Add("Fraccionamientos", desarrollosValue);
            parametros.Add("Vocaciones", filters.IdVocacion);
            parametros.Add("FechaInicial", filters.FechaInicial);
            parametros.Add("FechaFinal", filters.FechaFinal);
            parametros.Add("IdContratista", filters.IdContratista);
            parametros.Add("IdMedioSolicitud", filters.IdMedioSolicitud);
            parametros.Add("Proceden", filters.OpcionProcede);
            parametros.Add("Cancelados", filters.OpcionCancelado);
            parametros.Add("IdTipoFalla", filters.IdTipoFalla);
            parametros.Add("IdFalla", filters.IdFalla);
            parametros.Add("IdCausaFalla", filters.IdCausaFalla);
            parametros.Add("IdUsuario", base.getUserId());
            parametros.Add("EstatusDiagnostico", filters.OpcionesDiagEstatus);
            parametros.Add("EstatusPartidaDiagnostico", filters.OpcionesPartDiagEstatus);
            parametros.Add("EstatusFolio", filters.OpcionesEstatusFolio);
            parametros.Add("EstatusOT", filters.OpcionesEstatusOT);
            parametros.Add("MotivoCancelacion", filters.motivoCancelacionID);
            parametros.Add("Segmento", filters.Segmento);
            parametros.Add("IncidenciaAut", filters.IncidenciaAut);
            return await this.dao.GetConsulta(parametros);
        }

        public async Task<object[]> GetConsultaDatosSEGA(Dictionary<string, object> parametros)
        {

            var Result = await this.dao.GetConsultaDatosSEGA(parametros);
            return Result;
        }

        public async Task<object[]> GetConsultaIncidenciasNoVigentes(Dictionary<string, object> parametros)
        {

            var Result = await this.dao.GetConsultaIncidenciasNoVigentes(parametros);
            return Result;
        }

        public async Task<object[]> GetConsultaIncidenciasEntrega(Dictionary<string, object> parametros)
        {

            var Result = await this.dao.GetConsultaIncidenciasEntrega(parametros);
            return Result;
        }
          public async Task<object[]> GetConsultaChecklistPendiente(Dictionary<string, object> parametros)
        {

            var Result = await this.dao.GetConsultaChecklistPendiente(parametros);
            return Result;
        }

        public async Task<object[]> GetDiagnosticosOrdenesTrabajoByFolio(Dictionary<string, object> parametros)
        {

            var Result = await this.dao.GetDiagOTByFolo(parametros);
            return Result;
        }

        public async Task<object[]> GetConsultaReincidencias(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetConsultaReincidencias(parametros);

            return Result;

        }
        public async Task<object[]> GetReportePredictivo(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetReportePredictivo(parametros);

            return Result;

        }
        public async Task<object[]> GetReporteComparativaIncidenciasFirmadas(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetReporteComparativaIncidenciasFirmadas(parametros);

            return Result;

        }
        public async Task<object[]> GetReporteComparativaIncidenciasEntregadas(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetReporteComparativaIncidenciasEntregadas(parametros);

            return Result;

        }
        public async Task<object[]> GetConsultaDiasPromedioAtencion(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetConsultaDiasPromedioAtencion(parametros);

            return Result;

        }
        public async Task<object[]> GetReporteAppEstadistico(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetReporteAppEstadistico(parametros);

            return Result;

        }
        public async Task<object[]> GetReporteFoliosVivienda(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetReporteFoliosVivienda(parametros);
            return Result;

        }
    }
}