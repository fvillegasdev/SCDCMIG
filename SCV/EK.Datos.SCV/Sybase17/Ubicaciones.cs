using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class Ubicaciones
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IUbicaciones>, d.SCV.Interfaces.IUbicaciones
    {
        private const string USP_SPV_UBICACIONES_SELECT = "usp_spv_Ubicaciones_select";
        private const string USP_SCV_UBICACIONES_SELECT = "usp_scv_ubicaciones_select";
        private const string USP_SCV_CONSULTA_UBICACIONES_SELECT = "usp_scv_consultaUbicaciones_select";

        private const string USP_SCV_UBICACION_ESPECIAL_SELECT = "usp_scv_ubicacionesEspecial_select";
        private const string USP_SCV_REL_UBICACIONES_CONT_UPD = "usp_scv_rel_contratista_lote_upd_auto";

        public Ubicaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_UBICACIONES_SELECT, null, "sm_fraccionamiento_lote")
        { }

        public Task<int> UpdateEstatusUbicacion(int idUbicacion, string claveEstatus)
        {
            throw new NotImplementedException();
        }

        public async Task<object> GetUbicacion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_UBICACIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> GetConsultaUbicaciones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_CONSULTA_UBICACIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<int> saveRelContratistaLote(Dictionary<string, object> parametros)
        {
            try
            {
                
                int res = await helper.GetResultAsync(USP_SCV_REL_UBICACIONES_CONT_UPD, CommandType.StoredProcedure, parametros);
                return res; //await helper.CreateEntitiesAsync(USP_SCV_CONSULTA_UBICACIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> GetUbicacionesEspecial(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_UBICACION_ESPECIAL_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}