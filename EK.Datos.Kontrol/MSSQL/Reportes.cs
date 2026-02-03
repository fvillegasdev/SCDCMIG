using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Reportes
        : DAOBaseGeneric<m.Kontrol.Interfaces.IReporte>, d.Kontrol.Interfaces.IReportes
    {
        private const string USP_REPORTES_SELECT = "usp_reportes_select";
        private const string USP_REPORTES_CAMPOS_SELECT = "usp_reportesCampos_select";
        private const string USP_REPORTES_FILTROS_SELECT = "usp_reportesFiltros_select";

        public Reportes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
              factory,
              helper,
              USP_REPORTES_SELECT,
              string.Empty,
              "reportes")
        { }

        public async Task DeleteCampos(int idReporte)
        {
            await base.DeleteEntity(idReporte, "IdReporte", "ReportesCampos", false);
        }

        public async Task DeleteFiltros(int idReporte)
        {
            await base.DeleteEntity(idReporte, "IdReporte", "ReportesFiltros", false);
        }

        public async Task<List<m.Kontrol.Interfaces.IReporteCampo>> GetReporteCampos(int idReporte)
        {
            List<m.Kontrol.Interfaces.IReporteCampo> retValue;

            try
            {
                var p = new Dictionary<string, object> {
                    { "IdReporte", idReporte }
                };

                retValue = await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IReporteCampo>(USP_REPORTES_CAMPOS_SELECT, CommandType.StoredProcedure, p);

                return retValue;
            }
            catch (Exception e)
            {
                throw new ApplicationException("BP Application Exception", e);
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IReporteFiltro>> GetReporteFiltros(int idReporte)
        {
            List<m.Kontrol.Interfaces.IReporteFiltro> retValue;

            try
            {
                var p = new Dictionary<string, object> {
                    { "IdReporte", idReporte }
                };

                retValue = await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IReporteFiltro>(USP_REPORTES_FILTROS_SELECT, CommandType.StoredProcedure, p);

                return retValue;
            }
            catch (Exception e)
            {
                throw new ApplicationException("BP Application Exception", e);
            }
        }
    }
}
