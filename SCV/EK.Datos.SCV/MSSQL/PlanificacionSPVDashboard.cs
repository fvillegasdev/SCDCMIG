using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class PlanificacionSPVDashboard
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPlanificacionSPVDashboard>, d.SCV.Interfaces.IPlanificacionSPVDashboard
    {
        private const string USP_SPV_PLANIFICACION_SELECT = "usp_spv_planificacion_Select";
        private const string USP_SPV_PLANIFICACIONRECURSOSPROGRAMADOS_SELECT = "usp_spv_planificacionDashboard_Resources";

        public PlanificacionSPVDashboard(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_PLANIFICACION_SELECT, null, "PlanificacionSPVDashboard")
        { }
        public async Task<List<m.SCV.Interfaces.IPlanificacionSPV>> GetRecursosProgramados(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IPlanificacionSPV>(USP_SPV_PLANIFICACIONRECURSOSPROGRAMADOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public async Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetPlanificacionDetalle(int IdPlanificacion)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "IdPlanificacion", IdPlanificacion }
        //        };
        //        return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IPlanificacionSPVDetalle>(USP_SPV_PLANIFICACIONDETALLETIME_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

    }
}