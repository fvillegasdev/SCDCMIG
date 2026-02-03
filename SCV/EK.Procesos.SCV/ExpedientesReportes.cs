using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Globalization;

namespace EK.Procesos.SCV
{
    public class ExpedientesReportes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IExpediente, d.SCV.Interfaces.IExpedientesReportes>, p.SCV.Interfaces.IExpedientesReportes
    {
        public ExpedientesReportes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IExpedientesReportes dao)
            : base(factory, dao, "expedientesReportes")
        {
        }

        public async Task<object> GetReporteForecast(Dictionary<string, object> parametros)
        {
            return await this.dao.GetReporteForecast(parametros);
        }

        #region "Macro Etapas"
        public async Task<object> GetReporteInformativoMacroEtapas(Dictionary<string, object> parametros)
        {

            if (parametros.ContainsKey("Mes"))
            {
                parametros.Remove("Mes");
            }

            return await this.dao.GetReporteInformativoMacroEtapas(parametros);
        }

        public async Task<List<m.Kontrol.ItemGeneral>> GetMonths(Dictionary<string, object> parametros)
        {

            List<m.Kontrol.ItemGeneral> list = new List<m.Kontrol.ItemGeneral>();
            DateTime currentDate = DateTime.UtcNow;

            /*Agregando Mes Actual*/
            var monthCurrent = Get<m.Kontrol.ItemGeneral>();
            monthCurrent.ID = 1;
            monthCurrent.Clave = this.MonthName(currentDate.Month);
            monthCurrent.Nombre = currentDate.Year.ToString();
            monthCurrent.IdEstatus = currentDate.Month;
            list.Add(monthCurrent);

            for (int i = 1; i < 12; i++)
            {
                DateTime newDate = currentDate.AddMonths(-i);

                var item = Get<m.Kontrol.ItemGeneral>();
                item.ID = i+1;
                item.Clave = this.MonthName(newDate.Month) ;
                item.Nombre = newDate.Year.ToString();
                item.IdEstatus= newDate.Month;
                list.Add(item);

            }

            return list;
        }

        public string MonthName(int month)
        {
            DateTimeFormatInfo dtinfo = new CultureInfo("es-ES", false).DateTimeFormat;
            return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(dtinfo.GetMonthName(month));
        }

        #endregion


        #region "Reporte de expedientes suspendidos o cancelados"
        public async Task<object> GetExpedientesCanceladosSuspendidos(Dictionary<string, object> parametros)
        {
            parametros.Add("idUsuario",base.getUserId());
            return await this.dao.GetExpedientesCanceladosSuspendidos(parametros);
        }

        #endregion

        #region "Analisis de expedientes por etapa"
        public async Task<object> GetReporteAnalisisExpedientesPorEtapa(Dictionary<string, object> parametros)
        {
            if (parametros.ContainsKey("IdProceso"))
            {
                parametros.Remove("IdProceso");
            }
            return await this.dao.GetReporteAnalisisExpedientesPorEtapa(parametros);
        }

        public async Task<object> GetEtapasPorProceso(Dictionary<string, object> parametros)
        {
           
            return await this.dao.GetEtapasPorProceso(parametros);
        }
        #endregion


        public async Task<object> GetReporteFuerzaVentas(Dictionary<string, object> parametros)
        {
            return await this.dao.GetReporteFuerzaVentas(parametros);
        }

        public async Task<object> GetYearEjecucionProcesos(Dictionary<string, object> parametros)
        {
            return await this.dao.GetYearEjecucionProcesos(parametros);
        }

        public new async Task<object> Export(Dictionary<string, object> parametros)
        {
            object clave = string.Empty;
            parametros.TryGetValue("claveReporte", out clave);
            parametros.Remove("claveReporte");
            string claveReporte = clave.ToString();

            switch (claveReporte)
            {
                case "reporteInformativoMacroEtapas":
                      return await this.GetReporteInformativoMacroEtapas(parametros);

                case "reporteFuerzaVentas":
                    return await this.GetReporteFuerzaVentas(parametros);

                case "reporteForecast":
                    return await this.GetReporteForecast(parametros);

                case "expedientesAnalisisPorEtapas":
                    return await this.GetReporteAnalisisExpedientesPorEtapa(parametros);

                case "expedientesCanceladosSuspendidos":
                    return await this.GetExpedientesCanceladosSuspendidos(parametros);

                default:
                    return null;

            }

        }
    }
}