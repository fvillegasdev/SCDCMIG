using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class PlanificacionSPVDetalle
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPlanificacionSPVDetalle>, d.SCV.Interfaces.IPlanificacionSPVDetalle
    {
        private const string USP_SPV_PLANIFICACIONDETALLE_SELECT = "usp_spv_planificacionDetalle_Select";
        private const string USP_SPV_PLANIFICACIONDETALLETIME_SELECT = "usp_spv_planificacionDetalleTime_Select";
        private const string USP_SPV_PLANIFICACIONDETALLE_TASKDESCENDIENTES = "usp_spv_planificacionDetalle_TaskDesc";


        public PlanificacionSPVDetalle(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_PLANIFICACIONDETALLE_SELECT, null, "PlanificacionSPVDetalle")
        { }

        public async Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetViewPrincipalActs(Dictionary<string, object> parametros)
        {
            try
            {

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IPlanificacionSPVDetalle>(USP_SPV_PLANIFICACIONDETALLETIME_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IPlanificacionSPVDetalle>> GetViewActsDet(Dictionary<string, object> parametros)
        {
            try
            {

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IPlanificacionSPVDetalle>(USP_SPV_PLANIFICACIONDETALLE_TASKDESCENDIENTES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}