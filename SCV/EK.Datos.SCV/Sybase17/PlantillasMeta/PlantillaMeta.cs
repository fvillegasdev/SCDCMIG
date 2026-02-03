using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Sybase17.PlantillasMeta
{
    public class PlantillaMeta : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.PlantillasMeta.IPlantillaMeta>, d.SCV.Interfaces.PlantillasMeta.IPlantillaMeta
    {
        public const string USP_SPV_EKCPLANTILLA = "usp_spv_ekcplantillas";
        public const string USP_SPV_EKCENCUESTA = "usp_spv_ekc_encuesta";
        public const string USP_SPV_EKCENCUESTA_PANTALLA = "usp_spv_ekc_encuesta_pantalla";
        public const string USP_SPV_EKCENCUESTA_PREGUNTA = "usp_spv_ekc_encuesta_pregunta";
        public const string USP_SPV_EKCENCUESTA_PREGUNTA_OPCION = "usp_spv_ekc_encuesta_pregunta_opcion";
        public PlantillaMeta(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
      : base(factory, helper, USP_SPV_EKCPLANTILLA, null, "plantillameta")
        {

        }

        public async Task<object> SaveEncuesta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_SPV_EKCENCUESTA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> SaveOpcion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_SPV_EKCENCUESTA_PREGUNTA_OPCION, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> SavePantalla(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_SPV_EKCENCUESTA_PANTALLA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> SavePlantilla(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_SPV_EKCPLANTILLA, CommandType.StoredProcedure, parametros);
               // return await helper.CreateEntitiesAsync(USP_SPV_EKCPLANTILLA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> SavePregunta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_SPV_EKCENCUESTA_PREGUNTA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
