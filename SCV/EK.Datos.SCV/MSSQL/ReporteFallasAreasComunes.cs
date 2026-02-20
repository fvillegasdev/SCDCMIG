using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ReporteFallasAreasComunes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReporteFallasAreasComunes>, d.SCV.Interfaces.IReporteFallasAreasComunes
    {

        public const string USP_SPV_REPORTESFALLASAREASCOMUNES_SELECT = "usp_reporte_areas_comunes";
        public const string USP_SEL_TIPOFALLAAREACOMUN = "usp_sel_TipoFallaAreaComun";
        public const string USP_SEL_FALLAAREACOMUN_POR_TIPOFALLA = "usp_sel_fallaAreaComun_tipoFalla";
        public const string USP_SEL_UBICACIONFALLA = "usp_sel_ubicacionFalla";
        public const string USP_SEL_CAUSAFALLA = "usp_sel_causaFalla";
        public const string USP_SPV_REPORTESFALLAS_CANCELAR_DETALLE_AREASCOMUNES = "usp_spv_ReportesFallas_cancelar_detalleAreasComunes";
        public const string USP_SPV_REPORTEFALLASAREASCOMUNES_CONSULTAS = "usp_spv_ReportesFallas_consultas_areas_comunes";
        public const string USP_SPV_REPORTESFALLASAREASCOMUNES_SELECT_DASHBOARD = "usp_reporte_areas_comunes_dashboard";

        public ReporteFallasAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_REPORTESFALLASAREASCOMUNES_SELECT, null, "sv_reporte_areas_comunes")
        { }

        public async Task<object> GetTipoFallas(int idUsuario)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idUsuario", idUsuario}
                };

                return await helper.CreateEntitiesAsync(
                    USP_SEL_TIPOFALLAAREACOMUN, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object> GetFallaAreaComun(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SEL_FALLAAREACOMUN_POR_TIPOFALLA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> GetUbicacionFalla(int idUsuario)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idUsuario", idUsuario}
                };
                return await helper.CreateEntitiesAsync(
                    USP_SEL_UBICACIONFALLA, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object> GetCausaFalla(int idUsuario)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idUsuario", idUsuario}
                };
                return await helper.CreateEntitiesAsync(
                    USP_SEL_CAUSAFALLA, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IReporteFallasAreasComunes> GetByEntityId(int id)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("Id", id);

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IReporteFallasAreasComunes>(
                    USP_SPV_REPORTESFALLASAREASCOMUNES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> CancelarDetallesFolio(string folio)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("folio", folio);
                //parametros.Add("idCliente", idCliente);

                return await helper.GetResultAsync(USP_SPV_REPORTESFALLAS_CANCELAR_DETALLE_AREASCOMUNES,
                    CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<object[]> GetFraccReportes(string DesarrolloClave)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("operacion", "CONSULTAR_REPORTES_CLIENTE");
                parametros.Add("DesarrolloClave", DesarrolloClave);

                return await helper.CreateEntitiesAsync(USP_SPV_REPORTEFALLASAREASCOMUNES_CONSULTAS,
                    CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> ValidarResponsablePlaza(string idPlaza)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("operacion", "CONSULTAR_VALIDACION_RESPONSABLE_PLAZA_AUTORIZADA");
                parametros.Add("idPlaza", idPlaza);

                return await helper.GetResultAsync(USP_SPV_REPORTEFALLASAREASCOMUNES_CONSULTAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IContratista>> GetContratistas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IContratista>(
                    USP_SPV_REPORTEFALLASAREASCOMUNES_CONSULTAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #region ++++++++++++++ Dashboard ++++++++++++++++++
        public async Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getStateDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFallaIndicador>(USP_SPV_REPORTESFALLASAREASCOMUNES_SELECT_DASHBOARD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getUsersDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFallaIndicador>(USP_SPV_REPORTESFALLASAREASCOMUNES_SELECT_DASHBOARD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.ITopReport>> getTopReportDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ITopReport>(USP_SPV_REPORTESFALLASAREASCOMUNES_SELECT_DASHBOARD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.IReporteFallasAreasComunes>> getGridDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFallasAreasComunes>(USP_SPV_REPORTESFALLASAREASCOMUNES_SELECT_DASHBOARD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> Search(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_REPORTESFALLASAREASCOMUNES_SELECT_DASHBOARD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    }
}
