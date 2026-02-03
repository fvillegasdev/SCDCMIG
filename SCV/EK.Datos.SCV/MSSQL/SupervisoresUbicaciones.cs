using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class SupervisoresUbicaciones
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISupervisorUbicacion>, d.SCV.Interfaces.ISupervisoresUbicaciones
    {
        private const string USP_SPV_BASE_SELECT = "usp_spv_supervisores_ubicaciones_select";

        public SupervisoresUbicaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_BASE_SELECT, null, "sm_fraccionamiento_lote")
        { }


        public async Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getSupervisoresFraccionamientos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISupervisorUbicacion>(USP_SPV_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getUbicacionesFraccionamientos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISupervisorUbicacion>(USP_SPV_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> saveSupervisoresUbicaciones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISupervisorUbicacion>(USP_SPV_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}