using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class SPVSupervisoresCoordinadores
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISPVCoordinadores>, d.SCV.Interfaces.ISPVCoordinadores
    {
        private const string USP_SPV_BASE_SELECT = "usp_spv_coordinadores_select";
        private const string USP_SPV_CAT_SELECT = "usp_spv_cats_select";
        private const string USP_SPV_CAT_SUPERVISORES_SELECT = "usp_spv_cats_supervisores_select";
        private const string USP_SPV_SUPERV_COORD_SELECT = "usp_spv_superv_coord_select";
        private const string USP_SPV_CAT_FRACC_SELECT = "usp_spv_cat_fracc_select";
        private const string USP_SPV_RESPONSABLES_CONSTRUCCION_SELECT = "usp_spv_ResponsablesConstruccion_select";
        //private const string USP_SPV_SUPERVISORES_CAT_DIS_SELECT = "usp_spv_supervisores_disponibles_cat_select";
        private const string USP_SPV_SUPERVISORES_CAT_SELECT = "usp_spv_cat_supervisores_select";

        public SPVSupervisoresCoordinadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_BASE_SELECT, null, "sv_supervisores")
        { }


        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getCoordinadores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISPVCoordinadores>(USP_SPV_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetCatsFromPlaza(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISPVCoordinadores>(USP_SPV_CAT_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetCatsSupFromPlaza(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISPVCoordinadores>(USP_SPV_CAT_SUPERVISORES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getResponsablesConstruccion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISPVCoordinadores>(USP_SPV_RESPONSABLES_CONSTRUCCION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.ISPVCoordinadoresSupervisores>> getSupervisores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISPVCoordinadoresSupervisores>(USP_SPV_SUPERV_COORD_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.ISmFraccionamiento>> getFraccionamientosCat(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISmFraccionamiento>(USP_SPV_CAT_FRACC_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.ISmFraccionamiento>> getFraccionamientosNoAsignados(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISmFraccionamiento>(USP_SPV_CAT_FRACC_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetSupervisoresAsignadosCAT(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISPVCoordinadores>(USP_SPV_SUPERVISORES_CAT_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetSupervisoresDisponiblesCAT(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISPVCoordinadores>(USP_SPV_SUPERVISORES_CAT_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       
    }
}