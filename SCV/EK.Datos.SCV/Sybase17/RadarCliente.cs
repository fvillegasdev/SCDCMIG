using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class RadarCliente
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IRadarCliente>, d.SCV.Interfaces.IRadarClientes
    {
        private const string INFO_CLIENTE_RADAR = "usp_spv_get_info_cliente_radar";
        private const string TOP_INCIDENCIAS_CLIENTE = "usp_spv_get_top5_fallas_radar";
        private const string SAVE_RADAR_CTE = "usp_spv_save_radar";
        private const string GET_CONSULTA_RADAR_CLIENTE = "usp_spv_get_radar_clientes_select";
        private const string GET_CONSULTA_RADAR_GENERAL = "usp_spv_reporte_radar_general_select";
        //========================================================================================
        private const string INFO_FRACCIONAMIETO_RADAR = "usp_spv_get_info_fraccionamiento_radar";
        private const string SAVE_RADAR_COMUNIDAD = "usp_spv_save_radar_comunidad";
        private const string GET_CONSULTA_RADAR_COMUNIDAD = "usp_spv_get_radar_comunidad_select";
        private const string GET_CONSULTA_RADAR_GENERAL_COMUNIDAD = "usp_spv_reporte_radar_general_comunidad_select";

        public RadarCliente(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
          : base(factory, helper, "", null, "RadarCliente")
        { }


        public async Task<m.SCV.Interfaces.IRadarCliente> GetDatosCliente(int Idcliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("idCliente", Idcliente);

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IRadarCliente>(
                    INFO_CLIENTE_RADAR, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task <List<m.SCV.Interfaces.IReporteFallaDetalle>> GetTopIncidenciasCliente(int Idcliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("idCliente", Idcliente);

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFallaDetalle>(
                    TOP_INCIDENCIAS_CLIENTE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> SaveRadar(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(
                    SAVE_RADAR_CTE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IRadarCliente>> GetConsultaRadarClientes(Dictionary<string, object> parametros)
        {
            try
            {

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IRadarCliente>(
                    GET_CONSULTA_RADAR_CLIENTE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConsultaRadarGeneral(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    GET_CONSULTA_RADAR_GENERAL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

//========================================== COMUNIDAD ===============================================
//===============================================================================================
        public async Task<object[]> GetDatosFraccionamiento(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    INFO_FRACCIONAMIETO_RADAR, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveRadarComunidad(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(
                    SAVE_RADAR_COMUNIDAD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConsultaRadarComunidad(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    GET_CONSULTA_RADAR_COMUNIDAD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConsultaRadarComunidadGeneral(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    GET_CONSULTA_RADAR_GENERAL_COMUNIDAD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
