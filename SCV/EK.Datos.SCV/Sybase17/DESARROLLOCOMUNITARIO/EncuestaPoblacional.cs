using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class EncuestaPoblacional : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IEncuestaPoblacional>, d.SCV.Interfaces.IEncuestaPoblacional
    {
        public const string USP_ENCUESTA_POBLACIONAL = "usp_encuesta_poblacional";
        public const string USP_TOTAL_ENCUESTA_POR_FRACCIONAMIENTO_LOTE = "usp_total_encuesta_por_fraccionamiento";
        public const string USP_TIPO_ENCUESTA_POBLACIONAL = "usp_tipo_encuesta_poblacional";
        public const string USP_TIPO_CLASIFICACION = "usp_tipo_clasificacion_encuesta_poblacional";
        public const string USP_CONSULTA = "usp_consulta_encuesta_poblacional";
        public const string USP_ENCUESTA_DETALLE = "usp_det_encuesta_poblacional";
        public EncuestaPoblacional(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
         : base(factory, helper, USP_ENCUESTA_POBLACIONAL, null, "sdc_encuestas")
        {

        }

        public async Task<object[]> GetEncuestaXFraccionamientoLote(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TOTAL_ENCUESTA_POR_FRACCIONAMIENTO_LOTE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> SaveSurvay(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_ENCUESTA_POBLACIONAL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetTipoEncuesta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TIPO_ENCUESTA_POBLACIONAL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetTipoClasificacion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TIPO_CLASIFICACION, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetConsulta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CONSULTA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> EncuestaDetalle(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_ENCUESTA_DETALLE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
