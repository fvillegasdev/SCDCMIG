using EK.Modelo.SCV.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ReportesFallas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReporteFalla>, d.SCV.Interfaces.IReportesFallas
    {
        private const string USP_SPV_REPORTESFALLAS_SELECT = "usp_spv_ReportesFallas_select2";
        private const string USP_SPV_REPORTESFALLAS_CONSULTAS = "usp_spv_ReportesFallas_consultas";
        private const string USP_SPV_REPORTESFALLAS_COMPONENTES_SELECT = "usp_spv_ReportesFallas_Componentes_select";
        private const string USP_SPV_REPORTESFALLAS_EVIDENCIAS = "usp_spv_ReportesFallas_Evidencias";
        private const string USP_SPV_REPORTESFALLAS_HISTORIALFECHASOT = "usp_spv_ReportesFallas_HistorialFechasOT";
        private const string USP_SPV_LISTAENVIARCORREOCAT_SELECT = "usp_spv_Cats_Enviar_Correo_select";
        private const string USP_SPV_CORREOENVIADOCAT_UPD = "usp_spv_Cat_Correo_enviado_upd";
        private const string USP_SPV_ADDBITACORAAUTORIZACION = "usp_Add_BitacoraAutorizacion";
        private const string USP_SPV_RUTAFIRMA_SELECT = "usp_spv_Get_Ruta_Evidencias";


        public ReportesFallas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_REPORTESFALLAS_SELECT, null, "sv_reporte2")
        { }

        public async Task<m.SCV.Interfaces.IFalla> GetFallaPartida(int idFalla, int idTipoFalla)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("operacion", "CONSULTAR_FALLA_PARTIDA");
                parametros.Add("idFalla", idFalla);
                parametros.Add("idTipoFalla", idTipoFalla);

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IFalla>(
                    USP_SPV_REPORTESFALLAS_CONSULTAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IComponente>> GetComponentes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IComponente>(
                    USP_SPV_REPORTESFALLAS_COMPONENTES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> ValidarEntregaVivienda()
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("operacion", "CONSULTAR_ENTREGA_VIVIENDA");

                return await helper.GetResultAsync(USP_SPV_REPORTESFALLAS_CONSULTAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<m.SCV.Interfaces.IBitacoraAutorizacionIncidencia> SaveBitacoraAutorizacion(Dictionary<string, object> parametros)
        {
            try
            {
                //parametros.Add("operacion", "CONSULTAR_FALLA_PARTIDA");

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IBitacoraAutorizacionIncidencia>(
                    USP_SPV_ADDBITACORAAUTORIZACION, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> GetReincidencias(Dictionary<string, object> parametros)
        {
            try
            {
                parametros.Add("operacion", "CONSULTAR_REINCIDENCIAS");

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFallaDetalle>(
                    USP_SPV_REPORTESFALLAS_CONSULTAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> GetNotificacionReincidencias(Dictionary<string, object> parametros)
        {
            try
            {
                parametros.Add("operacion", "NOTIFICAR_REINCIDENCIAS");

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFallaDetalle>(
                    USP_SPV_REPORTESFALLAS_CONSULTAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> GetClienteReportesCount(int idCliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("operacion", "CONSULTAR_NUMERO_REINCIDENCIAS");
                parametros.Add("idCliente", idCliente);

                return await helper.GetResultAsync(USP_SPV_REPORTESFALLAS_CONSULTAS,
                    CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> ActualizarCorreoEnviadoCat(int IdResponsableDictamen)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("IdCat", IdResponsableDictamen);

                return await helper.GetResultAsync(USP_SPV_CORREOENVIADOCAT_UPD,
                    CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<m.SCV.Interfaces.IReporteFalla> GetByEntityId(int id)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("idEntity", id);

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IReporteFalla>(
                    USP_SPV_REPORTESFALLAS_SELECT, CommandType.StoredProcedure, parametros);
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
                    USP_SPV_REPORTESFALLAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IContratista>> GetContratistas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IContratista>(
                    USP_SPV_REPORTESFALLAS_CONSULTAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IEvidenciaDiagnostico>> GetEvidencias(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IEvidenciaDiagnostico>(
                    USP_SPV_REPORTESFALLAS_EVIDENCIAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.IAgendaContratista>> GetHistorialFechasOT(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IAgendaContratista>(
                    USP_SPV_REPORTESFALLAS_HISTORIALFECHASOT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.IListaCatsCorreo>> GetCatsParaEnviarCorreo()
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListaCatsCorreo>(
                    USP_SPV_LISTAENVIARCORREOCAT_SELECT, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> GetRutaFirmas()
        {
            try
            {
                return await helper.CreateSingleEntityAsync<string>(
                    USP_SPV_RUTAFIRMA_SELECT, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<string> GetRutaFirmas(string file)
        {
            try
            {
                Dictionary<string, object> parametros = new Dictionary<string, object>();
                parametros.Add("", "");
                var ruta = await helper.GetResultStringAsync(USP_SPV_RUTAFIRMA_SELECT,
                    CommandType.StoredProcedure);
                return ruta;
                // return await helper.CreateSingleEntityAsync<string>(
                // USP_SPV_RUTAFIRMA_SELECT, CommandType.StoredProcedure);
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

                return await helper.GetResultAsync(USP_SPV_REPORTESFALLAS_CONSULTAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region DASHBOARD REPORTE FALLAS
        public async Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getStateDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFallaIndicador>(USP_SPV_REPORTESFALLAS_SELECT, CommandType.StoredProcedure, parametros);
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
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFallaIndicador>(USP_SPV_REPORTESFALLAS_SELECT, CommandType.StoredProcedure, parametros);
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
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ITopReport>(USP_SPV_REPORTESFALLAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IReporteFalla>> getGridDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFalla>(USP_SPV_REPORTESFALLAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion #region DASHBOARD REPORTE FALLAS

        public Task<object> GetEncabezadoFormalizacionVenta(int idCliente)
        {
            throw new NotImplementedException();
        }

        public Task<object[]> GetDescuentosFormalizacionVenta(int idCliente)
        {
            throw new NotImplementedException();
        }

        public Task<object[]> GetCreditosFormalizacionVenta(int idCliente)
        {
            throw new NotImplementedException();
        }

        public Task<object[]> GetSubsidiosFormalizacionVenta(int idCliente)
        {
            throw new NotImplementedException();
        }

        public Task<object> GetEncabezadoEquipamientoVivienda(int idCliente)
        {
            throw new NotImplementedException();
        }

        public Task<object[]> GetDetalleEquipamientoVivienda(int idCliente)
        {
            throw new NotImplementedException();
        }

        public Task<dynamic> GetTerminoGarantia(int idCliente)
        {
            throw new NotImplementedException();
        }

        public Task<object[]> GetClienteReportes(int idCliente)
        {
            throw new NotImplementedException();
        }

        public Task<List<IMotivosCancelacion>> GetMotivosCancelacionFolio()
        {
            throw new NotImplementedException();
        }
        public Task<int> CancelarDetallesFolio(string folio)
        {
            throw new NotImplementedException();
        } 
        public Task<int> GuardarIncidenciaNoVigente(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
        
        public Task<int> GuardarIncidenciasEntrega(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
        
        public Task<int> updateIncidenciasEntrega(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
        public  Task<int> SaveTempImg(string img)
        {
            throw new NotImplementedException();
        }

        public async Task<int> SaveEvidenciaCliente(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public async Task<object[]> GetEvidenciasCliente(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        } 
        public async Task<object[]> GetIncidenciasEntregaCliente(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
        public async Task<int> DeleteEvidenciaCliente(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public async Task<string> GetIndicadorCliente(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public async Task<object> ChangeContratistaOTClosed(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
    }
}