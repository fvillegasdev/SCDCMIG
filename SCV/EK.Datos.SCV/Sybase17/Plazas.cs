using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Sybase17
{
    public class Plazas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPlaza>, d.SCV.Interfaces.IPlaza
    {
        private const string USP_SCV_PLAZA_SELECT = "usp_scv_plaza_select";
        private const string USP_SPV_GERENTES_PLAZA = "usp_spv_gerentes_plaza_select";
        private const string USP_SPV_USER_BY_OT = "usp_spv_user_by_ot_select";
        private const string USP_SPV_CAT_PLAZA_FRACC = "usp_spv_cat_plaza_by_fracc";

        public Plazas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_PLAZA_SELECT, null, "scv_Plaza")
        { }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> getGerentes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuario>(USP_SPV_GERENTES_PLAZA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> getCatByClaveUbicacion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuario>(USP_SPV_CAT_PLAZA_FRACC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.Kontrol.Interfaces.IUsuario>> getUserByOrdenTrabajoID(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuario>(USP_SPV_USER_BY_OT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.IPlaza>> getPlazasClasificadores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IPlaza>(USP_SCV_PLAZA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}